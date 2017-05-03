using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FlowchartCreator.Data;
using FlowchartCreator.Models;
using FlowchartCreator.Helpers;
using Newtonsoft.Json;
using System.IO;
using System.Text;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Internal;

namespace FlowchartCreator.Controllers
{
    // Comment/Uncomment this to require authentication to access this controller's components.
    //[Authorize]
    public class FlowchartController : Controller
    {
        // Database object.
        private readonly FlowchartDbContext _context;

        // Create the appropriate database context.
        public FlowchartController(FlowchartDbContext context)
        {
            _context = context;
        }

        // GET: Flowcharts
        /// <summary>
        /// Lists the User's flowcharts. 
        /// </summary>
        /// <returns></returns>
        public async Task<IActionResult> Index()
        {
            var query = from flowcharts in _context.Flowcharts
                        where flowcharts.CreatedBy.Equals(User.Identity.Name)
                        select flowcharts;

            return View(await query.ToListAsync());
        }

        // GET: Flowcharts/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
                return NotFound();

            var flowchart = await _context.Flowcharts
                .SingleOrDefaultAsync(m => m.Id == id);
                
            if (flowchart == null)
                return NotFound();

            return View(flowchart);
        }

        // GET: Flowcharts/Create
        public IActionResult Create()
        {
            return View();
        }

        // Adds the flowchart to the database and creates a flowchart file. It then sends the user 
        // to the edit page to actually make the flowchart itself.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(Flowchart flowchart)
        {
            if (ModelState.IsValid)
            {
                while (true)
                {
                    string genUrl = Generators.Url();
                    var dupeUrl = (from url in _context.Flowcharts
                                where url.Url.Equals(genUrl)
                                select url).Any();

                    if (!dupeUrl)
                    {
                        flowchart.Url = genUrl;
                        break;
                    }
                }

                flowchart.LastModified = DateTime.UtcNow;
                flowchart.CreatedBy = HttpContext.User.Identity.Name;
                flowchart.CreatedDate = DateTime.UtcNow;
                _context.Add(flowchart);
                await _context.SaveChangesAsync();

                // Temporarily saves it locally to the following location.
                // This should have been offloaded to another class by now... :|
                string path = @"C:\Users\Taylor\flowchart-" + flowchart.Id + ".txt";
                byte[] byteArray = Encoding.UTF8.GetBytes(path);
                MemoryStream stream = new MemoryStream();
                using(FileStream fs = new FileStream(path, FileMode.CreateNew, FileAccess.ReadWrite))
                using (TextWriter tw = new StreamWriter(fs))
                {
                    tw.WriteLine(flowchart);
                }

                return RedirectToAction("Edit", new { id = flowchart.Id });
            }
            return View(flowchart);
        }

        
        // This is a middleware function that allows the front-end to parse the files stored on the back-
        // end within an object for display and manipulation.
        [HttpGet]
        public string GetJson(int? id)
        {
            // Note that this will read only the first line of the file and return that line.
            string path = @"C:\Users\Taylor\flowchart-" + id + ".txt";
            byte[] byteArray = Encoding.UTF8.GetBytes(path);
            MemoryStream stream = new MemoryStream();
            using (FileStream fs = new FileStream(path, FileMode.Open, FileAccess.Read))
            using (StreamReader sr = new StreamReader(fs))
            {
                return JsonConvert.SerializeObject(sr.ReadLine());
            }
        }

        // GET: Flowcharts/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
                return NotFound();

            var flowchart = await _context.Flowcharts.SingleOrDefaultAsync(m => m.Id == id);

            if (flowchart == null)
                return NotFound();

            return View();
        }

        // POST: Flowcharts/Edit/5
        [HttpPost]
        public async Task<IActionResult> Edit(FlowchartDataViewModel flowchart)
        {
            // Note that this deserialization and reserialization isn't necessary at this juncture. It will,
            // however, be necessary (likely) in later conversions to other types so we have a medium by which 
            // to translate data.
            Microsoft.Extensions.Primitives.StringValues stepData;
            Request.Form.TryGetValue("Steps", out stepData);
            var steps = JsonConvert.DeserializeObject<IEnumerable<Object>>(stepData);

            List<StepsViewModel> tSteps = new List<StepsViewModel>();
            foreach (var step in steps)
            {
                tSteps.Add(JsonConvert.DeserializeObject<StepsViewModel>(step.ToString()));
            }

            flowchart.Steps = tSteps;

            // If the model data is good and the file exists, save the flowchart data to a file.
            if(ModelState.IsValid)
            {
                string path = @"C:\Users\Taylor\flowchart-" + flowchart.id + ".txt";
                byte[] byteArray = Encoding.UTF8.GetBytes(path);
                MemoryStream stream = new MemoryStream();
                using (FileStream fs = new FileStream(path, FileMode.OpenOrCreate, FileAccess.ReadWrite))
                using (TextWriter tw = new StreamWriter(fs))
                {
                    tw.WriteLine(JsonConvert.SerializeObject(flowchart));
                }

                try
                {
                    var fc = await _context.Flowcharts.SingleOrDefaultAsync(m => m.Id == flowchart.id);
                    fc.LastModified = DateTime.UtcNow;
                    _context.Update(fc);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!FlowchartExists(flowchart.id))
                        return NotFound();
                    else
                        throw;
                }

                return RedirectToAction("Index");
            }
            else
            {
                // So this won't contain their original data but it will redirect them back to the form.
                // This is temporary until data is placed back into the form. So their changes are lost.
                Microsoft.Extensions.Primitives.StringValues tId;
                Request.Form.TryGetValue("id", out tId);
                return RedirectToAction("Edit", Convert.ToInt32(tId));
            }
        }

        // GET: Flowcharts/Delete/5
        // Deletes a flowchart from the database. It does not, however, delete the flowchart file.
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
                return NotFound();

            var flowchart = await _context.Flowcharts
                .SingleOrDefaultAsync(m => m.Id == id);
            if (flowchart == null)
                return NotFound();

            return View(flowchart);
        }

        // POST: Flowcharts/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var flowchart = await _context.Flowcharts.SingleOrDefaultAsync(m => m.Id == id);
            _context.Flowcharts.Remove(flowchart);
            await _context.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        private bool FlowchartExists(int id)
        {
            return _context.Flowcharts.Any(e => e.Id == id);
        }
    }
}
