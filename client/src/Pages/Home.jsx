import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../Redux/User/UserSlice';
import { jwtDecode } from 'jwt-decode';
import axios from "axios"
// import { parse } from 'node-html-parser';
// import fs, { read } from "fs"


export default function Home() {
const [scraper,setScraper] = useState('')
const [htmlContent, setHtmlContent] = useState('');
// const [renderHtml,setRenderHtml] = useState('')
const dispatch = useDispatch()

function onChageHandler(e){
const key = e.target.name
const value = e.target.value
setScraper((prv)=>{
  return {...prv , [key]:value}
})
}
useEffect(() => {
  localStorage.setItem("lastRoute", location.pathname);
  // const keepData = localStorage.getItem('scraped')
  // setHtmlContent(keepData)
  const items = localStorage.getItem('item');
if(items != null){
  const decoded = jwtDecode(items);
      dispatch(signInSuccess(decoded['user']));
}
}, []);

const onClickHandler = async ()=>{
  // const test = {scraper}
  try {
    const token = localStorage.getItem('item')
    // console.log(token)
    const res = await axios.post('http://localhost:5000/api/scrape',
    // {body:{'data':scraper}},
    scraper,
    {headers: {
      'authorization': token}
    })
    // .catch((err)=>{console.log("Not Working : ",err.message)})
    // console.log('done')
    // fs.readFile(res.data,'utf-8',(err,data)=>{
    //   if (err){
    //     console.log('couldnt read the file : ', err.message)
    //   } else {
    //     setHtmlContent(data);
    //   }
    // })
    // console.log(res.data)
    const data = await res.data;
    // const html = data.test
    // setRenderHtml(data)
    if(data){
      // localStorage.setItem('scraped',data)
      setHtmlContent(data)
    }
  } catch (error) {
    console.log('Error from frontend :', error.message)
  }
}

// const extractParagraphs = (htmlString) => {
//   const root = parse(htmlString);
//   const paragraphs = root.querySelectorAll('p');
//   // const pics = paragraphs.querySelectorAll('img')
//   return paragraphs.map((p) => (
//     <div key={p.innerHTML}>
//       {paragraphs.querySelectorAll('img').map((img) => (
//         <div key={img.outerHTML}>
//         <img src={img.getAttribute('src')} alt={img.getAttribute('alt')}/>
//         </div>
//       ))}
//       {paragraphs.querySelectorAll('a').map((a) => (
//         <div key={a.outerHTML}>
//         <a href={a.getAttribute('href')} />
//         </div>
//       ))}
//       <p dangerouslySetInnerHTML={{ __html: p.innerHTML }}></p>
//     </div>
//   ));
// };

  return (
    <div className='flex flex-col mt-10 justify-center ml-10 mr-10'>
      <div className='w-11/12 h-15 bg-slate-100 p-3 rounded-2xl '>
        <section className='w-full h-10 flex items-start'>
          <span className='w-10 h-full'>
          {/* <i className="fa-light fa-magnifying-glass"></i> */}
          </span>
          {/* <FontAwesomeIcon icon="fa-light fa-magnifying-glass" /> */}
          <input placeholder='Past the URL' className='w-full h-full font-medium md:pl-2 focus:outline-none rounded-2xl bg-slate-100 p-3 ' type='text' name='url' onChange={onChageHandler}/>
          <button className='w-28 h-full flex justify-center items-center font-medium bg-slate-300 rounded-2xl p-3 hover:opacity-80' onClick={onClickHandler}>Scrape</button>
          </section>
      </div>
      {/* <dev className='bg-slate-100 mt-5'>{ htmlContent }</dev> */}
      {/* <dev dangerouslySetInnerHTML={{ __html: extractParagraphs(renderHtml) }}></dev> */}
      <div className='bg-slate-100 mt-5 mb-10'>{ htmlContent }</div>
    </div>
  )
}
