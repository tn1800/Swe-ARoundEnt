import React from 'react';
import axios from 'axios'; 
import {Container, Grid, Card, CardContent, CardMedia, Typography, IconButton} from "@mui/material"; 
import DeleteIcon from "@mui/icons-material/Delete"; 
import {useEffect, useState} from 'react'; 

const ProductList = () => {
  const [products, setProducts] = useState([]); 
  //implement the get products function
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products"); 
      setProducts(response.data); 
    } catch (error) {
      console.error("Error fetching products:", error); 
    }
  };

  useEffect(() => {
    fetchProducts(); 
  }, []); 

  //implement the delete function
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`); 
      setProducts(prevProducts => prevProducts.filter((product) => product.id !== id));
  } catch (error) {
      console.error("Error deleting product:", error);
  }
  };

  return (
    <Container style={{ marginTop: "40px" }}> 
      
      <Typography 
        variant="h4" 
        component="h1" 
        align="center" 
        gutterBottom 
        style={{ fontWeight: "bold", marginBottom: "30px" }}
      >
        Simple Card List
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card style={{ position: "relative" }}>
              
              <IconButton
                color="error"
                onClick={() => handleDelete(product.id)}
                style={{ position: "absolute", top: 5, left: 5 }}
              >
                <DeleteIcon />
              </IconButton>

              <CardMedia
                component="img"
                height="200"
                image={product.imageUrl}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>

                
                <Typography variant="body1" color="textSecondary">
                  {product.description}
                </Typography>
                <Typography variant="h6">${product.price}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;