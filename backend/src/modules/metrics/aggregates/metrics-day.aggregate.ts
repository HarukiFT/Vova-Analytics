import mongoose from "mongoose"

export default (projectId: mongoose.Types.ObjectId, targetValue: string, from: Date, to: Date): mongoose.PipelineStage[] => (
  [
    {
      $match: {
        value: targetValue,
        project: projectId,

        timestamp: {
          $gte: from,
          $lte: to
        }
      }
    },
    {
      $group: {
        _id: {
          year: { $year: "$timestamp" },
          month: { $month: "$timestamp" },
          day: { $dayOfMonth: "$timestamp" }
        },
        count: { $sum: 1 }
      }
    },
    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1,
        "_id.day": 1
      }
    },
    {
      $project: {
        _id: 0,
        date: {
          $dateFromParts: {
            year: "$_id.year",
            month: "$_id.month",
            day: "$_id.day"
          }
        },
        count: 1
      }
    }
])