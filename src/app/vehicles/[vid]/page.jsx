"use client";

import VehicleDetail from "@/app/components/Vehicle/VehicleDetail";
import { baseURL } from "@/util";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useNotification } from "@/app/components/NotificationProvider";
import { StarIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";


const queryClient = new QueryClient();

export default function ListVehiclesPage({ params }) {
  return (
    <QueryClientProvider client={queryClient}>
      <VehicleSpecs vid={Number(params.vid)} />
    </QueryClientProvider>
  );
}

function VehicleSpecs({ vid }) {
  const [vehicle, setVehicle] = useState();
  const { data: session } = useSession();

  const {
    isLoading: pendingVehicle,
    error: errorVehicle,
    data: vehicleData,
  } = useQuery({
    queryKey: ["/api/vehicles", vid],
    queryFn: () =>
      axios.get(baseURL() + "/api/vehicles/" + vid).then((res) => res.data),
    retryDelay: 1000,
    enabled: !!vid,
  });

  const {
    isLoading: pendingReviews,
    error: errorReviews,
    data: reviewsData,
  } = useQuery({
    queryKey: ["review", vid],
    queryFn: () => axios.get(`${baseURL()}/api/review/${vid}`).then((res) => res.data),
    retryDelay: 1000,
    enabled: !!vid,
  });

  useEffect(() => {
    setVehicle(vehicleData);
  }, [vehicleData])


  if (pendingVehicle || pendingReviews)
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  if (errorVehicle)
    return (
      "An error has occurred: " +
      errorVehicle.message
    );

  if (errorReviews)
    return (
      "An error has occurred: " +
      errorReviews.message
    );


  return (
    <>
      {vehicle && <VehicleDetail vehicle={{
        ...vehicle,
        averageRating: reviewsData.reduce((acc, cur) => acc + cur.rating, 0) / reviewsData.length
      }} />}

      <h2 className=" text-3xl font-bold my-2">Reviews</h2>
      {session && <ReviewForm vid={vid} />}
      <div>
        {reviewsData && reviewsData.map((review, i) => {
          return (
            <div key={i} className="card my-2 bg-base-200">
              <div className="card-body">
                <p>{`${review.author.name} reviewed on ${new Date(review.createdAt).toDateString()}`}</p>
                <h2 className="card-title">{review.title}</h2>
                <div className="flex">
                  {
                    [...Array(review.rating).keys()].map((i) => {
                      return (<StarIcon key={i} className="h-6 w-6 text-yellow-300" />)
                    })
                  }
                </div>
                <p >
                  {review.body}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <h2>
        <Link
          href="/vehicles"
          style={{
            border: "1px solid #ccc",
            textAlign: "center",
            color: "red",
            margin: "4px",
          }}
        >
          Back
        </Link>
      </h2>
    </>
  );
}

function ReviewForm({ vid }) {
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviews, setReviews] = useState("");
  const [star, setStar] = useState(5);
  const dispatch = useNotification();
  return (
    <div className="collapse bg-base-200">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium">
        Add your reviews
      </div>
      <div className="collapse-content">
        <input type="text" placeholder="Review Title"
          onChange={(e) => setReviewTitle(e.target.value)}
          className="input input-bordered w-full max-w-lg mr-4" />
        <div className="rating">
          {
            [1, 2, 3, 4, 5].map((star) => {
              return (
                <input
                  onClick={() => {
                    setStar(star)
                  }}
                  key={star}
                  type="radio"
                  name="rating-1"
                  className="mask mask-star-2"
                />
              );
            })
          }
        </div>

        <textarea
          className="textarea textarea-bordered w-full my-2"
          placeholder="Write your reviews here..."
          onChange={(e) => setReviews(e.target.value)}
        ></textarea>
        <div className="w-full flex flex-row-reverse">
          <button className="btn btn-primary"
            onClick={() => {
              axios.post(baseURL() + "/api/review", {
                vehicleId: vid,
                title: reviewTitle,
                body: reviews,
                rating: star,
              })
                .then((res) => {
                  dispatch({
                    type: "INFO",
                    message: "Review added successfully!",
                  })
                  queryClient.invalidateQueries({ queryKey: ['review', vid] })
                }).catch(err => {
                  dispatch({
                    type: "ERROR",
                    message: `Cannot add review! (Error: ${err.response.data})`,
                  })
                })
            }}>Add Review</button>
        </div>
      </div>
    </div>
  )
}
