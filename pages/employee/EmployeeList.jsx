import React from 'react'
import baseUrl from "../../pages/api/baseUrl";
import { toast } from 'react-nextjs-toast'
import axios from 'axios'
import Employee from './Employee';

const EmployeeList = () => {
    const [employees, setEmployees] = useState();
    const [loading, setLoading] = useState(true);
    const [employeeId, setEmployeeId] = useState(null);
    const [responseExpenditure, setResponseExpenditure] = useState(null);

    useEffect(() => {
        axios({ 
            method: "GET",
                    url:`${baseUrl}employees/${id}`,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }).then((res) =>{
                    setEmployees(res.data);
                    setLoading(false);
                }).catch ((error) =>{
                    toast.notify(error);
                }) 
                
    });

    const deleteEmployee = (e, id) => {
        e.preventDefault();
        axios({
            method: "DELETE",
            url:`${baseUrl} /employees/${id}`,
        }).then((res) => {
            if (res.data) {
                setUsers((prevElement) => {
                    return prevElement.filter((user) => user.id !== id);
                });
            }
        });
    };

    const editEmployee = (e, id) => {
        e.preventDefault();
        setUserId(id);
    };

  return (
    <>
    <div className="container mx-auto my-8">
        <div className="flex shadow border-b">
            <table className="min-w-full">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                            First Name
                        </th>
                        <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                            Last Name
                        </th>
                        <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                            EmailId
                        </th>
                        <th className="text-right font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                            Actions
                        </th>
                    </tr>
                </thead>
                {!loading && (
                    <tbody className="bg-white">
                        {employees?.map((employee) => {
                            <Employee
                            employee={employee}
                                key={employee.id}
                                deleteEmployee={deleteEmployee}
                                editEmployee={editEmployee}
                            />
                        })}
                    </tbody>
                )}
            </table>
        </div>
    </div>
    <EditEmp employeeId={employeeId} setResponseUser={setResponseExpenditure} />
</>
  )
}

export default EmployeeList