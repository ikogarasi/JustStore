using JustShop.ProductAPI.Models.dto;

namespace JustShop.ProductAPI.Repository.IRepository
{
    public interface IProductRepository
    {
        Task<IEnumerable<ProductDto>> GetProducts();
        Task<ProductDto> GetProductById(int id);
        Task<ProductDto> UpsertProduct(ProductDto product);
        Task<bool> DeleteProduct(int id);
    }
}
