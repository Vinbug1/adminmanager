import React from 'react'

const EditExpen = ({expenditureId, setResponseExpenditure}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expenditure, setExpenditure] = useState({
    id: "",
    amount: "",
    employee: "",
    purpose: "",
    approved: "",
    approvedBy: "",
    approvedDate:""
  });

  useEffect(() => {
         axios({
          method: "GET",
          url:`${baseUrl} /expenditures/${expenditureId}`,
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) =>{
            setUser(res.data);
            setIsOpen(true);
        }).catch((error) => {
        console.log(error);
      })
    
  //   if (userId) {
  //     fetchData();
  //   }
  });

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleChange = (event) => {
    const value = event.target.value;
    setUser({ ...expenditure, [event.target.name]: value });
  };

  const reset = (e) => {
    e.preventDefault();
    setIsOpen(false);
  };

  const updateExpenditure = async (e) => {
    e.preventDefault();
    axios({
      method: "PUT",
      url:`${baseUrl}expenditures/${expenditureId}`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((responseJson) => {

        if (responseJson !== 200) {
          toast.notify(" Employee was successfully updated");
        }
        setResponseUser(user);
        reset(e);
    }).catch((error) =>{
      toast.notify(error.message);
    })};
  return (
    <Transition appear show={isOpen} as={Fragment}>
    <Dialog
      as="div"
      className="fixed inset-0 z-10 overflow-y-auto"
      onClose={closeModal}>
      <div className="min-h-screen px-4 text-center">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95">
          <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-md">
            <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-gray-900">
              Update Expenditure
            </Dialog.Title>
            <div className="flex max-w-md max-auto">
              <div className="py-2">
                <div className="h-14 my-4">
                  <label className="block text-gray-600 text-sm font-normal">
                    Amount
                   </label>
                  <input
                    type="text"
                    name="amount"
                    value={expenditure.amount}
                    onChange={(e) => handleChange(e)}
                    className="h-10 w-96 border mt-2 px-2 py-2"></input>
                </div>
                <div className="h-14 my-4">
                  <label className="block text-gray-600 text-sm font-normal">
                    Staff Incharge
                  </label>
                  <input
                    type="text"
                    name="StaffIncharge"
                    value={expenditure.employees}
                    onChange={(e) => handleChange(e)}
                    className="h-10 w-96 border mt-2 px-2 py-2"></input>
                </div>
                <div className="h-14 my-4">
                  <label className="block text-gray-600 text-sm font-normal">
                    Purpose
                  </label>
                  <input
                    type="text"
                    name="purpose"
                    value={expenditure.purpose}
                    onChange={(e) => handleChange(e)}
                    className="h-10 w-96 border mt-2 px-2 py-2"></input>
                </div>
                 <div className="h-14 my-4">
                    <label className="block text-gray-600 text-sm font-normal">
                      Approved
                    </label>
                    <input
                      type="text"
                      name="approved"
                      value={expenditure.approved}
                      onChange={(e) => handleChange(e)}
                      className="h-10 w-96 border mt-2 px-2 py-2"></input>
                  </div>
                  <div className="h-14 my-4">
                    <label className="block text-gray-600 text-sm font-normal">
                      ApprovedBy
                    </label>
                    <input
                      type="text"
                      name="approvedBy"
                      value={expenditure.approvedBy}
                      onChange={(e) => handleChange(e)}
                      className="h-10 w-96 border mt-2 px-2 py-2"></input>
                  </div>
                  <div className="h-14 my-4">
                    <label className="block text-gray-600 text-sm font-normal">
                      ApprovedDate
                    </label>
                    <input
                      type="text"
                      name="approvedDate"
                      value={expenditure.approvedDate}
                      onChange={(e) => handleChange(e)}
                      className="h-10 w-96 border mt-2 px-2 py-2"></input>
                  </div>
                 
                <div className="h-14 my-4 space-x-4 pt-4">
                  <button
                    onClick={updateExpenditure}
                    className="rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-6">
                    Update
                  </button>
                  <button
                    onClick={reset}
                    className="rounded text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-6">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition.Child>
      </div>
    </Dialog>
  </Transition>
  )
}

export default EditExpen