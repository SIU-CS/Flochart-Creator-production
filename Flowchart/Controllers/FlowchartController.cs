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

namespace FlowchartCreator.Controllers
{
    // DEBUG: Comment/Uncomment this to require authentication to access this controller's components.
    //[Authorize]
    public class FlowchartController : Controller
    {
        private readonly FlowchartDbContext _context;

        public FlowchartController(FlowchartDbContext context)
        {
            _context = context;
        }

        // GET: Flowcharts
        /// <summary>
        /// List the User's flowcharts here. 
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
            {
                return NotFound();
            }

            var flowchart = await _context.Flowcharts
                .SingleOrDefaultAsync(m => m.Id == id);
            if (flowchart == null)
            {
                return NotFound();
            }

            return View(flowchart);
        }

        // GET: Flowcharts/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Flowcharts/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(Flowchart flowchart)
        {
            if (ModelState.IsValid)
            {
                while (true)
                {
                    string genUrl = Generators.Url();
                    var duplicateUrl = (from url in _context.Flowcharts
                                where url.Url.Equals(genUrl)
                                select url).Any();

                    if (!duplicateUrl)
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

                return RedirectToAction("Edit", new { id = flowchart.Id });
            }
            return View(flowchart);
        }

        // GET: Flowcharts/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var flowchart = await _context.Flowcharts.SingleOrDefaultAsync(m => m.Id == id);
            // Comment the line above and uncomment the lines below to use the parser.
            //var flowchartUrl = await _context.Flowcharts.SingleOrDefaultAsync(m => m.Id == id);
            //var flowchart = Parsers.ToObject(flowchartUrl.Url, "xml");

            if (flowchart == null)
            {
                return NotFound();
            }

            // Note that this will read only the first line of the file and return that line.
            string path = "C:\flowchart-" + id + ".txt";
            byte[] byteArray = Encoding.UTF8.GetBytes(path);
            MemoryStream stream = new MemoryStream(byteArray);
            using (StreamReader sr = new StreamReader(stream))
            {
                return (Json(sr.ReadLine()));
            }

            // We have to populate the steps list via the parser.
            //return View(test);
        }

        // POST: Flowcharts/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, string flowchart)
        {
            string path = "C:\flowchart-" + id + ".txt";
            using (TextWriter tw = new StreamWriter(new MemoryStream(Encoding.UTF8.GetBytes(path))))
            {
                tw.WriteLine(flowchart);
            }

            // Note that this will return to index whether it works or not.
            return RedirectToAction("Index");

            //if (id != flowchart.Id)
            //{
            //    return NotFound();
            //}

            //if (ModelState.IsValid)
            //{

            //    flowchart.Steps = temp;

            //    // Now, need to pass data to the parser.

            //    try
            //    {
            //        _context.Update(flowchart);
            //        await _context.SaveChangesAsync();
            //    }
            //    catch (DbUpdateConcurrencyException)
            //    {
            //        if (!FlowchartExists(flowchart.Id))
            //        {
            //            return NotFound();
            //        }
            //        else
            //        {
            //            throw;
            //        }
            //    }
            //    return RedirectToAction("Index");
            //}
            //return View(flowchart);
        }

        // GET: Flowcharts/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var flowchart = await _context.Flowcharts
                .SingleOrDefaultAsync(m => m.Id == id);
            if (flowchart == null)
            {
                return NotFound();
            }

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
