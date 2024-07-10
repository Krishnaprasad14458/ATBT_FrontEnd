import React, { useEffect, useState } from "react";
import atbtApi from "../../../../serviceLayer/interceptor";

const Updates = () => {
    const [updates, setUpdates] = useState([]);

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await atbtApi.get("task/ListStatus");
                console.log("response", response);
                if (response.status === 200) {
                    setUpdates(response.data);
                    console.log("Status updated successfully:", response.data);
                } else {
                    console.error("Unexpected response status:", response.status);
                }
            } catch (error) {
                console.error("Error updating status:", error);
            }
        };

        fetchStatus(); 
    }, []);

    return (
        <div>
            <h1>Updates</h1>
            {updates.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Sender ID</th>
                            <th>Message</th>
                            <th>Task ID</th>
                            <th>Date</th>
                            <th>Created At</th>
                            <th>Updated At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {updates.map((update) => (
                            <tr key={update.id}>
                                <td>{update.id}</td>
                                <td>{update.senderId}</td>
                                <td>{update.message}</td>
                                <td>{update.TaskId}</td>
                                <td>{update.Date}</td>
                                <td>{update.createdAt}</td>
                                <td>{update.updatedAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No updates available</p>
            )}
        </div>
    );
};

export default Updates;
