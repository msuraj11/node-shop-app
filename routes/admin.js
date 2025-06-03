const express =  require('express');

const router = express.Router();

const products = [];

router.get('/add-product', (req, res) => {
  res.send(`<body>
              <header>
                <nav>
                  <ul>
                    <li><a href="/">Shop</a></li>
                    <li><a href="/admin/add-product">Add Product</a></li>
                  </ul>
                </nav>
              </header>
              <form action="/admin/add-product" method="POST">
                <label>Add products to cart</label>
                <input required type="text" name="product" />
                <button type="submit">Send</button>
                <ul>
                    ${products.length > 0 ?
                      products.map(product => `<li>${product}</li>`).join('') : ''
                    }
                </ul>
              </form>
            </body>
            <script>
              document.querySelector('input').focus();
            </script>`
          );
});

router.post('/add-product', (req, res) => {
  const {product} = req.body;
  products.push(product);
  res.redirect('/');
});

module.exports = router;