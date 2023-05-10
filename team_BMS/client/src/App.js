import { React, useEffect, useState } from "react";//react hooks
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'; //bootstrap
import Navbar from './Homepage/Navbar';  //Navbar
import MovieTime from './Homepage/MovieTime'; //collection of Time
import MovieSelection from './Homepage/MovieSelection';// collection of Movies
import MovieSeats from './Homepage/MovieSeats'; //no of seats
import BookingDetails from './Homepage/BookingDetails' // last booking details
import axios from "axios" //fetching Api data
import { ToastContainer, toast } from "react-toastify"; // for floating warning and comfirmation
import "react-toastify/dist/ReactToastify.css";
// const URL = 'http://localhost:8080/v1/api/' //backend url
const URL = "https://mern-bms-backend-server.onrender.com/v1/api/"


function App() {

  const [lastBookingDetails, setLastBookingDetails] = useState([]);
  const [bools, setBools] = useState(false)
  const [isSubmit, setisSubmit] = useState(true)//rename this 
  const [movieTime, setMovieTime] = useState(true)

  //page data 
  const [body, setBody] = useState({
    movie: "",
    time: "",
    seats: []
  });

  //get moviedata to display on UI and modify movie that user has provided
  const moviedata = (movieName) => {
    setBody({
      ...body, movie: movieName
    })

  }
  //get timeData to display on UI and modify time that user has provided
  const timeData = (movieTime) => {
    setBody({
      ...body, time: movieTime
    })
  }
  //get seatData to display on UI and modify seat that user has provided
  const seatData = (seat) => {
    console.log(seat)
    //if A1 or any seatType is already present in the body.seats it will give zero in return or else -1 will returned
    const seatIndex = body.seats.findIndex((elem) => elem.seatType === seat.seatType);

    if (seatIndex !== -1) {
      console.log(seatIndex)
      const newSeatData = [...body.seats];
      // {seatType: 'A2', seatNo: 2}this type of value inside seat
      newSeatData[seatIndex] = seat;
      // value inside newSeatData looks like this kinda
      // [
      //   { seatType: 'A2', seatNo: 2 },
      //   { seatType: 'A1', seatNo: 1 },
      //   { seatType: 'A5', seatNo: 4 },
      //   '-1': { seatType: 'A3', seatNo: 12 }
      // ]
      console.log("triggerCheck", newSeatData)

      //now putting the updated seat data with the other movie data inside body state.
      setBody({
        ...body,
        seats: newSeatData,
      })

    }

    //if there is no two similar seatType then add the seats to previous selected seats and then add the seat array to the movieData
    else {
      setBody({
        ...body,
        seats: [...body.seats, seat],
      });
    }
  }



  ///submit data
  const createData = async (event) => {
    console.log(body)
    event.preventDefault()//to prevent reload of page after pressing the submit button
    if (!body.movie) {
      toast.error("Please select a movie.", { autoClose: 1000 });
      return;
    }

    if (!body.time) {
      toast.error("Please select a movie time.", { autoClose: 1000 });
      return;
    }
    if (!(body.seats.length > 0)) {
      toast.error("Please select a movie seats.", { autoClose: 1000 });
      return;
    }
    try {
      await axios.post(`${URL}/selectmovie`, body)
      toast.success(successToast());
      setBody({
        movie: "",
        time: "",
        seats: []
      })
    } catch (error) {
      console.log(error)
    }
    finally {
      lastBooking()
      setisSubmit(false)
      setMovieTime(false)

    }

  }

  //getLastBookingDetails
  const lastBooking = async () => {

    try {
      let response = await axios.get(`${URL}/getdata`) //getting back data from server
      console.log(response.data)
      setLastBookingDetails(response.data)
    } catch (error) {
      console.log(error)
    }
    finally {
      setBools(true)

    }


  }


  const clearData = async () => {
    await axios.delete(`${URL}/delete`)// clearing data from server
    lastBooking()
    console.log("allDataisDeleted")
  }

  //rendering the last booking data only if bools changes
  useEffect(() => {
    lastBooking()
  }, [bools])


  //popup animation configuration
  const successToast = () => {
    toast("Ticket booked", {
      className: "custom-toast",
      draggable: false,
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000

    })
  }

  return (
    <div id="bgBC">
      <Navbar />
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-6">
            {/* passing data from parent to child as prop */}
            <MovieSelection moviedata={moviedata} isSubmit={isSubmit} setisSubmit={setisSubmit} />
            <MovieTime timeData={timeData} movieTime={movieTime} setMovieTime={setMovieTime} setisSubmit={setisSubmit} />
            <MovieSeats seatData={seatData} isSubmit={isSubmit} setisSubmit={setisSubmit} />
          </div>
          <div class="col-md-6">
            <BookingDetails lastBookingDetails={lastBookingDetails} clearData={clearData} />
          </div>
        </div>
      </div>
      <ToastContainer />
      <span className="button">
        <form onSubmit={createData}>
          <button type="submit" className="btn btn-outline-success btn-lg">Book now</button>
        </form>
      </span>
    </div>

  );
}

export default App;
