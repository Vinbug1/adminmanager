import React, { useState, useEffect } from "react";
import EditExpen from "./EditExpen";
import Expenditure from "./Expenditure";

const ExpenditureList = () => {
    const [expenditures, setExpenditures] = useState();
    const [loading, setLoading] = useState(false);
    const [expenditureId, setExpenditureId] = useState(null);
    const [responseExpenditure, setResponseExpen] = useState(null);

    useEffect(() => {
            setLoading(true);
            axios({
                method: "GET",
                    url:`${baseUrl}expenditures/${id}`,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }).then((res) =>{
                    setExpenditures(res.data);
                    setLoading(false);
                }).catch ((error) => {
                    console.log(error);
                }) 
        });

    const deleteExpenditure = (e, id) => {
        e.preventDefault();
        axios({
            method: "DELETE",
            url:`${baseUrl} /expenditures/${id}`,
        }).then((res) => {
            if (expenditure) {
                setExpenditure((prevElement) => {
                    return prevElement.filter((expenditure) => expenditure.id !== id);
                });
            }
        });
    };

    const editExpenditure = (e, id) => {
        e.preventDefault();
        setExpenditureId(id);
    };
  return (
    <>
            <div className="container mx-auto my-8">
                <div className="flex shadow border-b">
                    <table className="min-w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                                    Amount
                                </th>
                                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                                    Staff In charge
                                </th>
                                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                                    approved
                                </th>
                                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                                    approvedBy
                                </th>
                                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                                    approvedDate
                                </th>
                                <th className="text-right font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        {!loading && (
                            <tbody className="bg-white">
                                {expenditures?.map((expenditure) => {
                                    <Expenditure 
                                        expenditure={expenditure}
                                        key={expenditure.id}
                                        deleteExpenditure={deleteExpenditure}
                                        editExpenditure={editExpenditure}
                                    />
                                })}
                            </tbody>
                        )}
                    </table>
                </div>
            </div>
            <EditExpen expenditureId={expenditureId} setResponse={setResponseExpen} />
        </>
  )
}

export default ExpenditureList