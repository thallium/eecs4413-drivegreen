'use client'

import { baseURL } from '@/util'
import React from 'react'
import axios from "axios";
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Watchlist() {
    return (
        <QueryClientProvider client={queryClient}>
            <WatchList />
        </QueryClientProvider>
    );
}

function WatchList() {
    const {
        isLoading: pendingWatchlist,
        error: errorWatchlist,
        data: watchlist,
    } = useQuery({
        queryKey: ["watchlist"],
        queryFn: () =>
            axios.get(baseURL() + "/api/watchlist/").then((res) => res.data),
        retryDelay: 1000,
    });

    if (pendingWatchlist)
        return (
            <div className="flex items-center justify-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    if (errorWatchlist) {
        return (
            <div>
                {"An error has occurred: " + errorWatchlist.message}
            </div>
        );
    }
    return (
        watchlist.map((item) => (
            <div key={item.vehicle.vid} className="my-4">
                <div className='flex'>
                    <h2 className="card-title mr-5">{item.vehicle.name}</h2>
                    <h2 className="card-title mr-5">{"hot-dealt: " + (item.vehicle.hotDealed ? "Yes" : "No")}</h2>
                    <button className="btn btn-primary" onClick={() => {
                        axios.delete(baseURL() + "/api/watchlist/", {
                            data: {
                                vehicleId: item.vehicle.vid
                            }
                        }).then((res) => {
                            queryClient.invalidateQueries({ queryKey: ['watchlist'] })
                        })
                    }}>Remove</button>
                </div>
            </div>
        ))
    )
}
