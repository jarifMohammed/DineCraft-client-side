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
          className="w-full max-w-xs shadow-xl border rounded-lg border-gray-400 bg-gradient-to-br from-green-200 to-green-50 hover:shadow-2xl transform hover:scale-105 transition-transform duration-300"
        >
          <CardHeader shadow={false} floated={false} className="h-48">
            <img src={food.image} alt={food.name} className="h-full w-full bg-slate-100 object-cover rounded-t-lg" />
          </CardHeader>
          <CardBody className="flex flex-col gap-2 items-center my-5">
            <Typography className="font-extrabold text-xl text-green-800 tracking-wide">
              {food.name}
            </Typography>
            <Typography className="text-lg text-gray-700 font-semibold">
              {food.category}
            </Typography>
            <Typography className="text-xl font-bold text-orange-600">
              ${food.price}
            </Typography>
            <Typography className="text-base text-gray-600 italic">
              Sold {food.total_sold} times
            </Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              ripple={false}
              fullWidth={true}
              className="text-white bg-orange-500 font-semibold py-2 rounded-lg hover:bg-orange-600 transition-all duration-300"
              onClick={() => navigate(`/food-details/${food._id}`)}
            >
              View Details
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
