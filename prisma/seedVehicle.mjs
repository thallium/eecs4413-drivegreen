import { Brand, Shape } from '@prisma/client'
// import seedUser from './seedUser.mjs'

export default async function seedVehicle(prisma, users) {
  const [user1, user2, user3] = users

  const veh1 = await prisma.vehicle.upsert({
    where: { name: 'Ford XLT', },
    update: {},
    create: { // minimum: only required fields
      name: 'Ford XLT',
      brand: Brand.Ford,
      price: 40000.00
    },
  })

  const veh2 = await prisma.vehicle.upsert({
    where: { name: 'Ford Mach-E' },
    update: {
      hotDealed: true,
    },
    create: {
      name: 'Ford Mach-E',
      brand: Brand.Ford,
      price: 35000.0,
      shape: Shape.L,
      description: 'this is a special version, like new',
      Mileage: 80000,
      damaged: true,
      reviews: {
        create: [
          { authorId: user1.uid, rating: 5, title: 'good car for 35k' },
          { authorId: user2.uid, rating: 4, title: "it's too large" },
        ],
      },
    },
  });


  const veh3 = await prisma.vehicle.upsert({
    where: { name: 'Tesla Model S' },
    update: {},
    create: {
      name: 'Tesla Model S',
      brand: Brand.Tesla,
      price: 99990.0,
      shape: Shape.L,
      description: 'one of the most popular electric cars',
      hotDealed: true,
      subscriptions: {
        create: {
          user: {
            connect: {
              uid: user1.uid,
            },
          },
        },
      },
    },
  });


  let res = [veh1, veh2, veh3];

  const v_data = [
    {
      name: 'Tesla Model 3',
      brand: Brand.Tesla,
      price: 50000.0,
      shape: Shape.M,
      description: 'A mid-size all-electric four-door sedan',
    },

    {
      name: 'Nissan Leaf',
      brand: Brand.GeneralMotors,
      price: 30000.0,
      hotDealed: true,
      Mileage: 50000,
      shape: Shape.M,
      description: 'An electric hatchback car',
    },
   
    {
      name: 'Audi e-tron',
      brand: Brand.Audi,
      price: 60000.0,
      shape: Shape.L,
      description: 'A premium electric SUV',
    },

    {
      name: 'Jaguar I-Pace',
      brand: Brand.Jeep,
      price: 70000.0,
      hotDealed: true,
      shape: Shape.L,
      description: 'A luxury electric SUV',
    },
    
    {
      name: 'Hyundai Kona Electric',
      brand: Brand.Hyundai,
      price: 40000.0,
      shape: Shape.M,
      hotDealed: false,
      description: 'An electric subcompact SUV',
      modelYear: 2023,
    },

    {
      name: 'Toyota Prius Prime',
      brand: Brand.Toyota,
      price: 35000.0,
      shape: Shape.M,
      hotDealed: true,
      Mileage: 60000,
      damaged: true,
      description: 'A plug-in hybrid hatchback',
      modelYear: 2022,
    },

    {
      name: 'BMW i3',
      brand: Brand.BMW,
      price: 45000.0,
      shape: Shape.S,
      hotDealed: false,
      description: 'An all-electric compact car',
      modelYear: 2023,
    },
    
    {
      name: 'Chevrolet Bolt EV',
      brand: Brand.Chevrolet,
      price: 38000.0,
      shape: Shape.M,
      hotDealed: false,
      Mileage: 50000,
      description: 'An affordable all-electric car',
      modelYear: 2023,
    },
  ];

  let cnt = 0;
  for (const vehicleData of v_data) {
    const v = await prisma.vehicle.upsert({
      where: { name: vehicleData.name },
      update: {},
      create: vehicleData,
    });

    if(cnt < 3) {
      res.push(v);
      cnt++;
    }
  }
  // console.log({ veh1, veh2, veh3 })
  return res;
}