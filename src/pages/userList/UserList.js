import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import ChangeRole from "../../components/changeRole/ChangeRole";
import { Spinner } from "../../components/loading/Loader";
import PageMenu from "../../components/pageMenu/PageMenu";
import Search from "../../components/search/Search";
import UserStats from "../../components/userStats/UserStats";
import UseRedirectSession from "../../customHook/UseRedirectSession";
import { deleteUser, getUsers } from "../../redux/features/auth/authSlice";
import { shortenName } from "../profile/Profile";
import "./UserList.scss";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { FILTER_USERS, selectUsers } from "../../redux/features/auth/searchSlice";
import ReactPaginate from 'react-paginate';


const UserList = () => {
  UseRedirectSession("/login");
const { users, isLoading, } =
    useSelector((state) => state.auth);
const [search, setSearch] = useState("")
  const filteredUsers = useSelector(selectUsers)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  // console.log(users);
  const removeUser = async(id)=>
  {
    await dispatch(deleteUser(id))
    await dispatch(getUsers())
  }

  const confirmDelete = (id) => {
    confirmAlert({
      title: 'Delete this user?',
      message: '',
      buttons: [
        {
          label: 'Yes',
          onClick: () => removeUser(id)
        },
        {
          label: 'Cancel',
          
        }
      ]
    });
  };

  useEffect(()=>{
    dispatch(FILTER_USERS({users, search}))
  },[dispatch, users, search])

// Pagination
const itemsPerPage = 5
const [itemOffset, setItemOffset] = useState(0);


const endOffset = itemOffset + itemsPerPage;
console.log(`Loading items from ${itemOffset} to ${endOffset}`);
const currentItems = filteredUsers.slice(itemOffset, endOffset);
const pageCount = Math.ceil(filteredUsers.length / itemsPerPage);


const handlePageClick = (event) => {
  const newOffset = (event.selected * itemsPerPage) % filteredUsers.length;
  
  setItemOffset(newOffset);
};

  return (
    <section>
      <div className="container">
        <PageMenu />
        <UserStats />
        <div className="user-list">
          {isLoading && <Spinner />}
          <div className="table">
            <div className="--flex-between">
              <span>
                <h3>All Users</h3>
              </span>
              <span>
                <Search value={search} onChange={(e)=>setSearch(e.target.value)} />
              </span>
            </div>
            {!isLoading && users.length === 0 ? (
              <p>no User Found</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>s/n</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Change Role</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((user, index) => {
                    const { _id, name, email, role } = user;
                    return (
                      <tr key={_id}>
                        <td>{index + 1}</td>
                        <td>{shortenName(name, 8)}</td>
                        <td>{email}</td>
                        <td>{role}</td>
                        <td>
                          <ChangeRole id={_id} email={email}/>
                        </td>
                        <td>
                          <span>
                            <FaTrash size={20} color="red" onClick={()=>confirmDelete(_id)}/>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
          <ReactPaginate
        breakLabel="..."
        nextLabel="Next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< Prev"
        renderOnZeroPageCount={null}
        containerClassName= "pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="activePage"
      />
      <hr/>
        </div>
      </div>
    </section>
  );
};

export default UserList;
