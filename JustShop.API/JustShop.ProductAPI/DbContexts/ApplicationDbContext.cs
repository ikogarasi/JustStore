using JustShop.ProductAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace JustShop.ProductAPI.DbContexts
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Product>().HasData(new Product
            {
                Id = 1,
                Name = "MacBook",
                Price = 1500,
                Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eleifend dui nunc, vel aliquet diam viverra vel. ",
                ImageUrl = "https://vitaliikutsan.blob.core.windows.net/justshop/Images/macbook.jpg",
                Category = "Laptops"
            });
            modelBuilder.Entity<Product>().HasData(new Product
            {
                Id = 2,
                Name = "HP Laptop",
                Price = 1000,
                Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eleifend dui nunc, vel aliquet diam viverra vel. ",
                ImageUrl = "https://vitaliikutsan.blob.core.windows.net/justshop/Images/hp.png",
                Category = "Laptops"
            });
            modelBuilder.Entity<Product>().HasData(new Product
            {
                Id = 3,
                Name = "Iphone 12",
                Price = 700,
                Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eleifend dui nunc, vel aliquet diam viverra vel. ",
                ImageUrl = "https://vitaliikutsan.blob.core.windows.net/justshop/Images/iphone-12.jpg",
                Category = "Phones"
            });
            modelBuilder.Entity<Product>().HasData(new Product
            {
                Id = 4,
                Name = "Iphone 13",
                Price = 900,
                Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eleifend dui nunc, vel aliquet diam viverra vel. ",
                ImageUrl = "https://vitaliikutsan.blob.core.windows.net/justshop/Images/iphone-13.png",
                Category = "Phones"
            });
            modelBuilder.Entity<Product>().HasData(new Product
            {
                Id = 5,
                Name = "Apple watch",
                Price = 500,
                Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eleifend dui nunc, vel aliquet diam viverra vel. ",
                ImageUrl = "https://vitaliikutsan.blob.core.windows.net/justshop/Images/watch.jpeg",
                Category = "Watches"
            });
        }
    }
}
