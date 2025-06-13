import React, { useState } from 'react'
import { Star, ThumbsUp, ThumbsDown, ChevronUp, ChevronDown } from "lucide-react"

const ReviewsSection = ({ reviews }) => {
    const [showAllReviews, setShowAllReviews] = useState(false)
    const [sortBy, setSortBy] = useState("newest")

    if (!reviews || reviews.length === 0) {
        return <div>No reviews available</div>
    }

    // Calculate average rating
    const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length

    // Calculate rating distribution
    const ratingCounts = Array(5).fill(0)
    reviews.forEach((review) => {
        ratingCounts[review.rating - 1]++
    })

    const ratingPercentages = ratingCounts.map((count) => (count / reviews.length) * 100)

    // Sort reviews
    const sortedReviews = [...reviews].sort((a, b) => {
        if (sortBy === "newest") {
            return new Date(b.date).getTime() - new Date(a.date).getTime()
        } else if (sortBy === "highest") {
            return b.rating - a.rating
        } else if (sortBy === "lowest") {
            return a.rating - b.rating
        } else if (sortBy === "helpful") {
            return b.helpfulCount - a.helpfulCount
        }
        return 0
    })

    const displayedReviews = showAllReviews ? sortedReviews : sortedReviews.slice(0, 3)

    return (
        <div>
            <h2 className="text-2xl font-light mb-8">Customer Reviews</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {/* Summary */}
                <div className="md:col-span-1">
                    <div className="flex flex-col items-center text-center p-6 bg-[#f8f5f0]">
                        <div className="text-4xl font-light mb-2">{averageRating.toFixed(1)}</div>
                        <div className="flex mb-2">
                            {Array(5)
                                .fill(0)
                                .map((_, i) => (
                                    <Star
                                        key={i}
                                        size={18}
                                        className={i < Math.round(averageRating) ? "fill-black text-black" : "text-gray-300"}
                                    />
                                ))}
                        </div>
                        <div className="text-sm text-gray-500 mb-4">Based on {reviews.length} reviews</div>
                        <button className="bg-black hover:bg-gray-800 text-white py-2 px-4">Write a Review</button>
                    </div>
                </div>

                {/* Rating Distribution */}
                <div className="md:col-span-2">
                    <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map((rating) => (
                            <div key={rating} className="flex items-center gap-4">
                                <div className="flex items-center gap-1 w-16">
                                    <span>{rating}</span>
                                    <Star size={14} className="fill-black text-black" />
                                </div>
                                <div className="h-2 flex-1 bg-gray-200">
                                    <div className="h-full bg-black" style={{ width: `${ratingPercentages[rating - 1]}%` }}></div>
                                </div>
                                <div className="w-12 text-right text-sm">{ratingCounts[rating - 1]}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sort Controls */}
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-medium">Reviews ({reviews.length})</h3>
                <div className="flex items-center gap-2">
                    <span className="text-sm">Sort by:</span>
                    <select
                        className="text-sm border-b border-gray-300 pb-1 pr-6 bg-transparent"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="newest">Newest</option>
                        <option value="highest">Highest Rating</option>
                        <option value="lowest">Lowest Rating</option>
                        <option value="helpful">Most Helpful</option>
                    </select>
                </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-8">
                {displayedReviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-8">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                    <img src={review.avatar} alt={review.name} className="w-full h-full rounded-full object-cover" />
                                </div>
                                <div>
                                    <div className="font-medium">{review.name}</div>
                                    <div className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</div>
                                </div>
                            </div>
                            <div className="flex">
                                {Array(5)
                                    .fill(0)
                                    .map((_, i) => (
                                        <Star key={i} size={16} className={i < review.rating ? "fill-black text-black" : "text-gray-300"} />
                                    ))}
                            </div>
                        </div>

                        {review.title && <h4 className="font-medium mb-2">{review.title}</h4>}

                        <p className="text-gray-600 mb-4">{review.comment}</p>

                        {review.images && review.images.length > 0 && (
                            <div className="flex gap-2 mb-4">
                                {review.images.map((image, index) => (
                                    <div key={index} className="w-16 h-16 relative">
                                        <img
                                            src={image || "/placeholder.svg"}
                                            alt={`Review image ${index + 1}`}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="flex items-center gap-6 text-sm">
                            <div className="text-gray-500">Was this review helpful?</div>
                            <button className="flex items-center gap-1 hover:text-black">
                                <ThumbsUp size={14} />
                                <span>Yes ({review.helpfulCount})</span>
                            </button>
                            <button className="flex items-center gap-1 hover:text-black">
                                <ThumbsDown size={14} />
                                <span>No</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Show More Button */}
            {reviews.length > 3 && (
                <div className="flex justify-center mt-8">
                    <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 border-gray-300" onClick={() => setShowAllReviews(!showAllReviews)}>
                        {showAllReviews ? (
                            <>
                                <ChevronUp size={16} className="mr-2" />
                                Show Less
                            </>
                        ) : (
                            <>
                                <ChevronDown size={16} className="mr-2" />
                                Show All Reviews ({reviews.length})
                            </>
                        )}
                    </button>
                </div>
            )}
        </div>
    )
}

export default ReviewsSection