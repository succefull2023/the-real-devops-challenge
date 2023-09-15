db = connect( 'mongodb://localhost/food_db' );
db.restaurant.insertMany( [
    {
        'URL': 'http://www.just-eat.co.uk/restaurants-bayleafn9/menu',
        '_id': '55f14313c7447c3da7052249',
        'address': '61 Bounces Road',
        'address line 2': 'Edmonton',
        'name': 'Bayleaf',
        'outcode': 'N9',
        'postcode': '8JE',
        'rating': 5,
        'type_of_food': 'Curry'
      },
      {
        'URL': 'http://www.just-eat.co.uk/restaurants-bayleafn9/menu',
        '_id': '55f14313c7447c3da705224a',
        'address': '61 Bounces Road',
        'address line 2': 'Edmonton',
        'name': 'Bayleaf',
        'outcode': 'N9',
        'postcode': '8JE',
        'rating': 5,
        'type_of_food': 'Curry'
      },
      {
        'URL': 'http://www.just-eat.co.uk/restaurants-bayleaf-de75/menu',
        '_id': '55f14313c7447c3da705224b',
        'address': '39 Market Street',
        'address line 2': 'Heanor',
        'name': 'Bayleaf',
        'outcode': 'DE75',
        'postcode': '7NR',
        'rating': 5,
        'type_of_food': 'Curry'
      }])
