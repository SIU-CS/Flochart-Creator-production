using FlowchartCreator.Models;
using Microsoft.EntityFrameworkCore;

namespace FlowchartCreator.Data
{
    public class FlowchartDbContext : DbContext
    {
        public FlowchartDbContext()
        {
        }

        public FlowchartDbContext(DbContextOptions<FlowchartDbContext> options)
            : base(options)
        {
        }

        public DbSet<Flowchart> Flowcharts { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Flowchart>().ToTable("Flowcharts");
        }
    }
}
