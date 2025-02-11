import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from '@material-tailwind/react';

const TopFoods = () => {
  const [topFoods, setTopFoods] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopFoods = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_URL}/top-foods`);
        const data = await response.json();
        // Filter out foods with total_sold === 0
        const filteredFoods = data.filter((food) => food.total_sold > 0);
        setTopFoods(filteredFoods);
        console.log(filteredFoods);
      } catch (error) {
        console.error('Error fetching top foods:', error);
      }
    };

    fetchTopFoods();
  }, []);

  return (
    <section className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center mb-6 text-white">Top Foods</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {topFoods.map((food) => (
          <Card
            key={food._id}
            className="w-full  max-w-xs shadow-lg border rounded-lg border-gray-500 bg-green-100 hover:shadow-2xl transform hover:scale-105 transition-transform duration-300"
          >
            <CardHeader shadow={false} floated={false} className="h-48">
              <img src={food.image} alt={food.name} className="h-full w-full bg-slate-100 object-cover" />
            </CardHeader>
            <CardBody>
              <Typography color="white" className="font-bold text-orange-400 text-lg mb-2">
                {food.name}
              </Typography>
              <Typography color="white" className="text-sm text-orange-400  mb-1">
                Category: {food.category}
              </Typography>
              <Typography color="white" className="text-sm text-orange-400 mb-1">
                Price: ${food.price}
              </Typography>
              <Typography color="white" className="text-sm text-orange-400 mb-3">
                Purchased: {food.total_sold} times
              </Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                ripple={false}
                fullWidth={true}
                className=" text-orange-500 bg-white hover:scale-105 transition-transform"
                onClick={() => navigate(`/food-details/${food._id}`)}
              >
                Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {/* "See All" Button */}
      <div className="text-center mt-8">
        <Button
          ripple={false}
          className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-blue-300 transition-transform"
          onClick={() => navigate('/all-foods')}
        >
          See All
        </Button>
      </div>
    </section>
  );
};

export default TopFoods;
