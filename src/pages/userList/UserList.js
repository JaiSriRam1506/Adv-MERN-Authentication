import React, { useEffect, useState } from 'react'
import './UserList.scss'
import { FaTrash, FaUser } from 'react-icons/fa'
import { BiUserCheck, BiUserMinus, BiUserX } from 'react-icons/bi'
import PageMenu from '../pageMenu/PageMenu'
import UserStatus from '../../components/userstatus/UserStatus'
import Search from '../../components/search/Search'
import ChangeRole from '../../components/changeRole/ChangeRole'
import {useSelector,useDispatch} from 'react-redux'
import { deleteUser, getUsers } from '../../redux/auth/authSlice'
import Loader, { Spinner } from '../../components/loader/Loader'
import { FILTER_USER } from '../../redux/auth/filteredItem'
import ReactPaginate from 'react-paginate';



const UserList = () => {
  const {users,isLoading}=useSelector((state)=>state.auth);
  const {filteredUsers}=useSelector((state)=>state.filter);
  const [search, setSearch] = useState("")
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(FILTER_USER({search,users}))
  },[search,dispatch,users])

  useEffect(()=>{
    dispatch(getUsers());
  },[dispatch])

  const delUser=async(_id)=>{
    await dispatch(deleteUser(_id))
    await dispatch(getUsers());
  }


// Start Paginate 
const itemsPerPage=9;
const [itemOffset, setItemOffset] = useState(0);
const endOffset = itemOffset + itemsPerPage;
const currentItems = filteredUsers?.slice(itemOffset, endOffset);
const pageCount = Math.ceil(filteredUsers?.length / itemsPerPage);

// Invoke when user click to request another page.
const handlePageClick = (event) => {
  const newOffset = (event.selected * itemsPerPage) % filteredUsers?.length;
  setItemOffset(newOffset);
};
//End Paginate

  return (
    <section>
    <div className='container'>
    {isLoading && <Loader/>}
      <PageMenu/>
      <UserStatus />
      <div className='user-list'>
        <div className='table'>
        <div className='--flex-between'>
            <span>
              <h3>All Users</h3>
            </span>
            <span>
              <Search  value={search} onChange={(e)=>{setSearch(e.target.value)}
                }/>
            </span>
        </div>
        {(!isLoading && users?.length===0)?(<p><b>No Users Found</b></p>):(
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
            {currentItems.map((user,index)=>{
              const {_id,name,email,role}=user;
              return(
                <tr key={_id}>
                <td>{index+1}</td>
                <td>{name}</td>
                <td>{email}</td>
                <td>{role}</td>
                <td><ChangeRole _id={_id} email={email}/></td>
                <td>
                  <span onClick={()=>delUser(_id)}>
                    <FaTrash size={20} color='red'/>
                  </span>
                </td>
              </tr>
              )
            })}
          </tbody>
        </table>
        )}
      </div>
      </div>
    </div>
    <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="Prev"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
    </section>
  )
}

export default UserList