import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from '@material-tailwind/react';

const FoodCard = ({ food }) => {
  const {
    name,
    image,
    category,
    quantity,
    price,
    origin,
    description,
    _id,
  } = food || {};

  // Shorten description for preview
  const shortDescription = description
    ? description.substring(0, 100) + '...'
    : '';

  return (
    <Card className="w-full rounded-lg max-w-xs mt-10 shadow-xl border border-gray-300 bg-gradient-to-br from-gray-100 to-gray-50 transition hover:scale-105 hover:shadow-2xl duration-300">
  <CardHeader shadow={false} floated={false} className="h-48">
    <img
      src={image}
      alt={name}
      className="h-full w-full object-cover rounded-t-lg"
    />
  </CardHeader>
  <CardBody>
    <div className="flex items-center justify-between mb-2">
      <Typography className="font-extrabold text-xl text-gray-800 tracking-wide">
        {name}
      </Typography>
      <Typography className="text-lg font-bold text-green-700">
        ${price}
      </Typography>
    </div>
    <Typography variant="small" className="text-gray-600 italic">
      {shortDescription}
    </Typography>
    <Typography variant="small" className="font-semibold text-gray-700 mt-3">
      <span className="text-orange-600">Category:</span> {category}
    </Typography>
    <Typography variant="small" className="font-semibold text-gray-700">
      <span className="text-orange-600">Quantity:</span> {quantity}
    </Typography>
    <Typography variant="small" className="font-semibold text-gray-700">
      <span className="text-orange-600">Origin:</span> {origin}
    </Typography>
  </CardBody>
  <CardFooter className="pt-0 text-center">
    <Link to={`/food-details/${_id}`}>
      <Button
        ripple={false}
        fullWidth={true}
        className="bg-gradient-to-r from-orange-400 to-orange-300 text-white font-semibold py-2 rounded-lg hover:scale-105 hover:shadow-lg transition-all duration-300"
      >
        View Details
      </Button>
    </Link>
  </CardFooter>
</Card>

  );
};

export default FoodCard;
