using AutoMapper;
using JustShop.ProductAPI.Models;
using JustShop.ProductAPI.Models.dto;

namespace JustShop.ProductAPI
{
    public class MappingConfig
    {
        public static MapperConfiguration RegisterMaps()
        {
            return new MapperConfiguration(config =>
            {
                config.CreateMap<Product, ProductDto>().ReverseMap();
            });
        }
    }
}
