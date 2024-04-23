using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Reflection.Metadata;
namespace ImageWorker.Models
{
    public class DataContext : DbContext
    {
        public DbSet<DataItem> DataItems { get; set; } = null!;
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
    }
    public class DataItem
    {
        public string GuId { get; set; } = Guid.NewGuid().ToString().ToUpper();
        //public int Id { get; set; }
        [Key]
        public string FileName { get; set; } = string.Empty;
        //public string RemoteFileUrl { get; set; } = string.Empty;
        public string FileData { get; set; } = string.Empty;
        //public string Base64FileExt { get; set; } = string.Empty;
    }
}
