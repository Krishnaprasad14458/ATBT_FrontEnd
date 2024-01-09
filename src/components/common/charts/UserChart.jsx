import React from 'react'
import { Bar } from "react-chartjs-2";

function UserChart() {
  return (
    <div>
        <div>
          <h2>Task Count based on Status</h2>
          {/* <Bar
            data={{
              labels: taskState?.tasks?.reduce(
                (acc, curr) =>
                  acc.includes(curr.status) ? acc : [...acc, curr.status],
                []
              ),
              datasets: [
                {
                  label: "Number of tasks",
                  data: Object.values(statusTaskCount),
                  backgroundColor: [
                    "rgba(54, 162, 235, 0.5)",
                    "rgba(255, 206, 86, 0.5)",
                    "rgba(153, 102, 255, 0.5)",
                    "rgba(75, 192, 192, 0.5)",
                  ],
                  borderColor: [
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(75, 192, 192, 1)",
                  ],
                  borderWidth: 1.5,
                },
              ],
            }}
          /> */}
        </div>
    </div>
  )
}

export default UserChart