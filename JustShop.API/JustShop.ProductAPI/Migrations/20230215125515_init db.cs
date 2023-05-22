using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JustShop.ProductAPI.Migrations
{
    public partial class initdb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Category = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<double>(type: "float", nullable: false),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Category", "Description", "ImageUrl", "Name", "Price" },
                values: new object[,]
                {
                    { 1, "Laptops", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eleifend dui nunc, vel aliquet diam viverra vel. ", "https://vitaliikutsan.blob.core.windows.net/justshop/Images/macbook.jpg", "MacBook", 1500.0 },
                    { 2, "Laptops", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eleifend dui nunc, vel aliquet diam viverra vel. ", "https://vitaliikutsan.blob.core.windows.net/justshop/Images/hp.png", "HP Laptop", 1000.0 },
                    { 3, "Phones", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eleifend dui nunc, vel aliquet diam viverra vel. ", "https://vitaliikutsan.blob.core.windows.net/justshop/Images/iphone-12.jpg", "Iphone 12", 700.0 },
                    { 4, "Phones", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eleifend dui nunc, vel aliquet diam viverra vel. ", "https://vitaliikutsan.blob.core.windows.net/justshop/Images/iphone-13.png", "Iphone 13", 900.0 },
                    { 5, "Watches", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eleifend dui nunc, vel aliquet diam viverra vel. ", "https://vitaliikutsan.blob.core.windows.net/justshop/Images/watch.jpeg", "Apple watch", 500.0 }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Products");
        }
    }
}
