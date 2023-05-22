import {
  Box,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useEffect, useState } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import { useLocation, useNavigate } from "react-router-dom";
import { Categories } from "../../common/categories/categories";

export const Sidebar = (props: any) => {
  const { isOpen, setIsOpen } = props;
  const barAnchor = "left";

  const ItemList = () => {
    const [categoriesOpen, setCategoriesOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleCategoryClick = () => {
      setCategoriesOpen(!categoriesOpen);
    };

    return (
      <Box sx={{ width: 250 }} role="presentation">
        <List>
          <ListItem>
            <ListItemButton onClick={() => navigate("/")}>
              <HomeOutlinedIcon />
              &nbsp;&nbsp;
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => navigate("/cart")}>
              <ShoppingCartOutlinedIcon />
              &nbsp;&nbsp;
              <ListItemText primary="Cart" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={handleCategoryClick}>
              <CategoryOutlinedIcon />
              &nbsp;&nbsp;
              <ListItemText primary="Categories" />
            </ListItemButton>
          </ListItem>
          <Collapse in={categoriesOpen} timeout="auto" unmountOnExit>
            <List>
              {Categories.map((c, index) => (
                <ListItem key={index}>
                  <ListItemButton onClick={() => navigate(`/${c}`)}>
                    <ListItemText primary={c} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>
          <Divider />
          <ListItem>
            <ListItemButton onClick={() => navigate("/products")}>
              <ListItemText primary="Products" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    );
  };

  return (
    <Box component="nav">
      {isOpen && (
        <Drawer
          variant="persistent"
          anchor={barAnchor}
          open={isOpen}
          onClose={() => setIsOpen(false)}
          sx={{
            width: "250px",
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: "250px",
            },
          }}
        >
          <Box width="100%">
            <Box padding="8px">
              <IconButton size="large" onClick={() => setIsOpen(false)}>
                <ChevronRightIcon />
              </IconButton>
            </Box>
            <ItemList />
          </Box>
        </Drawer>
      )}
    </Box>
  );
};
