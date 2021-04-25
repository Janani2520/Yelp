const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: '607b00915d770710c4f6da22',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                  
                  url: 'https://res.cloudinary.com/dcedj7ftk/image/upload/v1618750837/YelpCamp/iyb5u2rcuehz7dij8ylz.jpg',
                  filename: 'YelpCamp/iyb5u2rcuehz7dij8ylz'
                },
                {
                  
                  url: 'https://res.cloudinary.com/dcedj7ftk/image/upload/v1618750837/YelpCamp/w3z6gabmknpraa4oo7be.jpg',
                  filename: 'YelpCamp/w3z6gabmknpraa4oo7be'
                },
                {
                 
                  url: 'https://res.cloudinary.com/dcedj7ftk/image/upload/v1618750838/YelpCamp/vlmcluxeznaawt3ck3bc.jpg',
                  filename: 'YelpCamp/vlmcluxeznaawt3ck3bc'
                }
              ],

        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})