using AutoMapper;
using JustShop.ProductAPI.DbContexts;
using JustShop.ProductAPI.Models;
using JustShop.ProductAPI.Models.dto;
using JustShop.ProductAPI.Repository.IRepository;
using Microsoft.EntityFrameworkCore;

namespace JustShop.ProductAPI.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly ApplicationDbContext _db;
        private IMapper _mapper;

        public ProductRepository(ApplicationDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        public async Task<ProductDto> UpsertProduct(ProductDto productDto)
        {
            Product product = _mapper.Map<ProductDto, Product>(productDto);
            
            if (product.Id > 0)
            {
                _db.Products.Update(product);
            }
            else
            {
                _db.Products.Add(product);
            }
            
            await _db.SaveChangesAsync();
            
            return _mapper.Map<Product, ProductDto>(product);
        }

        public async Task<bool> DeleteProduct(int id)
        {
            try
            {
                Product productFromId = await _db.Products.FirstOrDefaultAsync(i => i.Id == id);
                if (productFromId == null)
                { 
                    return false;
                }

                _db.Products.Remove(productFromId);
                await _db.SaveChangesAsync();
                
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<ProductDto> GetProductById(int id)
        {
            Product productFromId = await _db.Products.FirstOrDefaultAsync(i => i.Id == id);
            
            return _mapper.Map<ProductDto>(productFromId);
        }

        public async Task<IEnumerable<ProductDto>> GetProducts()
        {
            List<Product> productList = await _db.Products.ToListAsync();
  
            return _mapper.Map<List<ProductDto>>(productList);
        }
    }
}
