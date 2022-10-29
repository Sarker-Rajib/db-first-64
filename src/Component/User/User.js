import React, { useEffect, useState } from 'react';

const User = () => {
   const [allUser, setUsers] = useState([]);

   useEffect(() => {
      fetch('http://localhost:5000/users')
         .then((response) => response.json())
         .then(data => setUsers(data))
   }, []);

   const handleSubmit = (e) => {
      e.preventDefault();

      const form = e.target;
      const name = form.name.value;
      const email = form.email.value;

      const user = {name, email};
      console.log(user);

      fetch('http://localhost:5000/users', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(user)
      })
      .then(res => res.json())
      .then(data => {
         const newUser = [...allUser, data];
         setUsers(newUser);
         console.log(data);
      })
      .catch(err => console.log(err))

      form.reset();
   }

   return (
      <div className="min-h-screen flex flex-row items-center justify-center bg-gray-100" >
         <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-50 max-w-md">

            <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
               Add  user
            </div>

            <div className="mt-10">
               <form onSubmit={handleSubmit}>
                  <div className="flex flex-col mb-5">
                     <label htmlFor="name" className="mb-1 text-xs tracking-wide text-gray-600">Name:</label>
                     <div className="relative">
                        <div className=" inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                           <i className="fas fa-user text-blue-500"></i>
                        </div>

                        <input id="name" type="text" name="name" className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="Enter your name" />
                     </div>
                  </div>

                  <div className="flex flex-col mb-5">
                     <label htmlFor="email" className="mb-1 text-xs tracking-wide text-gray-600">E-Mail Address:</label>
                     <div className="relative">
                        <div
                           className=" inline-flex items-center justify-center absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    text-gray-400
                  "
                        >
                           <i className="fas fa-at text-blue-500"></i>
                        </div>

                        <input
                           id="email"
                           type="email"
                           name="email"
                           className="
                    text-sm
                    placeholder-gray-500
                    pl-10
                    pr-4
                    rounded-2xl
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400
                  "
                           placeholder="Enter your email"
                        />
                     </div>
                  </div>

                  <div className="flex w-full">
                     <button type="submit" className=" flex mt-2 items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-500 hover:bg-blue-600 rounded-2xl py-2 w-full transition duration-150 ease-in">
                        <span className="mr-2 uppercase">Add</span>
                     </button>
                  </div>
               </form>
            </div>
         </div>
         <div>
            <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-50 max-w-md">

               <ul>
                  {
                     allUser.map((user) => <li key={user._id}>{user.name} {user.email}</li>)
                  }
               </ul>

            </div>
         </div>
      </div>
   );
};

export default User;