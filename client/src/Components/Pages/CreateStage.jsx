
// // import { useState } from "react";
// // import axios from "axios";

// // import {
// //     MapContainer,
// //     TileLayer,
// //     Marker,
// //     Popup,
// //     useMapEvents
// // } from "react-leaflet";

// // import L from "leaflet";

// // import "leaflet/dist/leaflet.css";


// // // Fix Leaflet marker icons
// // delete L.Icon.Default.prototype._getIconUrl;

// // L.Icon.Default.mergeOptions({
// //     iconRetinaUrl:
// //         "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

// //     iconUrl:
// //         "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

// //     shadowUrl:
// //         "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
// // });


// // // =====================================
// // // MAP CLICK COMPONENT
// // // =====================================

// // function LocationMarker({ setLocation }) {

// //     useMapEvents({

// //         click(e) {

// //             const { lat, lng } = e.latlng;

// //             setLocation({
// //                 latitude: lat,
// //                 longitude: lng
// //             });
// //         }

// //     });

// //     return null;
// // }


// // // =====================================
// // // CREATE STAGE
// // // =====================================

// // function CreateStage() {

// //     const [formData, setFormData] = useState({

// //         title: "",
// //         description: "",
// //         location: "",
// //         latitude: "",
// //         longitude: "",
// //         startTime: "",
// //         endTime: "",
// //         status: "upcoming"

// //     });


// //     const [loading, setLoading] = useState(false);


// //     // =====================================
// //     // INPUT CHANGE
// //     // =====================================

// //     const handleChange = (e) => {

// //         const { name, value } = e.target;

// //         setFormData((prev) => ({
// //             ...prev,
// //             [name]: value
// //         }));
// //     };


// //     // =====================================
// //     // MAP LOCATION
// //     // =====================================

// //     const setLocation = ({ latitude, longitude }) => {

// //         setFormData((prev) => ({
// //             ...prev,

// //             latitude,
// //             longitude
// //         }));
// //     };


// //     // =====================================
// //     // SUBMIT
// //     // =====================================

// //     const handleSubmit = async (e) => {

// //         e.preventDefault();

// //         try {

// //             setLoading(true);

// //             const response = await axios.post(
// //                 "http://localhost:3000/api/stages",
// //                 {
// //                     ...formData,

// //                     latitude: Number(formData.latitude),
// //                     longitude: Number(formData.longitude)
// //                 },
// //                 {
// //                     withCredentials: true
// //                 }
// //             );


// //             console.log(response.data);

// //             alert("Stage created successfully");


// //             // Reset form
// //             setFormData({

// //                 title: "",
// //                 description: "",
// //                 location: "",
// //                 latitude: "",
// //                 longitude: "",
// //                 startTime: "",
// //                 endTime: "",
// //                 status: "upcoming"

// //             });

// //         } catch (error) {

// //             console.log(error);

// //             alert(
// //                 error.response?.data?.message ||
// //                 "Failed to create stage"
// //             );

// //         } finally {

// //             setLoading(false);

// //         }
// //     };


// //     return (

// //         <div className="min-h-screen bg-gray-100 p-6">

// //             <div className="mx-auto max-w-5xl">

// //                 <div className="rounded-xl bg-white p-6 shadow">

// //                     <h1 className="mb-6 text-2xl font-bold">
// //                         Create Stage
// //                     </h1>


// //                     <form
// //                         onSubmit={handleSubmit}
// //                         className="space-y-5"
// //                     >


// //                         {/* TITLE */}

// //                         <div>

// //                             <label className="mb-1 block font-medium">
// //                                 Stage Title
// //                             </label>

// //                             <input
// //                                 type="text"
// //                                 name="title"
// //                                 value={formData.title}
// //                                 onChange={handleChange}
// //                                 placeholder="Enter stage title"
// //                                 className="w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-blue-500"
// //                                 required
// //                             />

// //                         </div>


// //                         {/* DESCRIPTION */}

// //                         <div>

// //                             <label className="mb-1 block font-medium">
// //                                 Description
// //                             </label>

// //                             <textarea
// //                                 name="description"
// //                                 value={formData.description}
// //                                 onChange={handleChange}
// //                                 placeholder="Enter stage description"
// //                                 rows="4"
// //                                 className="w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-blue-500"
// //                                 required
// //                             />

// //                         </div>


// //                         {/* LOCATION NAME */}

// //                         <div>

// //                             <label className="mb-1 block font-medium">
// //                                 Location
// //                             </label>

// //                             <input
// //                                 type="text"
// //                                 name="location"
// //                                 value={formData.location}
// //                                 onChange={handleChange}
// //                                 placeholder="e.g. University Auditorium"
// //                                 className="w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-blue-500"
// //                                 required
// //                             />

// //                         </div>


// //                         {/* MAP */}

// //                         <div>

// //                             <label className="mb-2 block font-medium">
// //                                 Select Stage Location
// //                             </label>


// //                             <div className="h-[400px] overflow-hidden rounded-xl border">

// //                                 <MapContainer
// //                                     center={[25.3960, 68.3578]}
// //                                     zoom={13}
// //                                     scrollWheelZoom={true}
// //                                     className="h-full w-full"
// //                                 >

// //                                     <TileLayer
// //                                         attribution='&copy; OpenStreetMap contributors'
// //                                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// //                                     />


// //                                     <LocationMarker
// //                                         setLocation={setLocation}
// //                                     />


// //                                     {formData.latitude &&
// //                                         formData.longitude && (

// //                                             <Marker
// //                                                 position={[
// //                                                     Number(formData.latitude),
// //                                                     Number(formData.longitude)
// //                                                 ]}
// //                                             >

// //                                                 <Popup>
// //                                                     Stage Location
// //                                                 </Popup>

// //                                             </Marker>

// //                                         )}

// //                                 </MapContainer>

// //                             </div>

// //                             <p className="mt-2 text-sm text-gray-500">
// //                                 Click on the map to select the stage location.
// //                             </p>

// //                         </div>


// //                         {/* COORDINATES */}

// //                         <div className="grid gap-4 md:grid-cols-2">

// //                             <div>

// //                                 <label className="mb-1 block font-medium">
// //                                     Latitude
// //                                 </label>

// //                                 <input
// //                                     type="number"
// //                                     value={formData.latitude}
// //                                     readOnly
// //                                     className="w-full rounded-lg border bg-gray-100 p-3"
// //                                 />

// //                             </div>


// //                             <div>

// //                                 <label className="mb-1 block font-medium">
// //                                     Longitude
// //                                 </label>

// //                                 <input
// //                                     type="number"
// //                                     value={formData.longitude}
// //                                     readOnly
// //                                     className="w-full rounded-lg border bg-gray-100 p-3"
// //                                 />

// //                             </div>

// //                         </div>


// //                         {/* DATE/TIME */}

// //                         <div className="grid gap-4 md:grid-cols-2">

// //                             <div>

// //                                 <label className="mb-1 block font-medium">
// //                                     Start Time
// //                                 </label>

// //                                 <input
// //                                     type="datetime-local"
// //                                     name="startTime"
// //                                     value={formData.startTime}
// //                                     onChange={handleChange}
// //                                     className="w-full rounded-lg border p-3"
// //                                     required
// //                                 />

// //                             </div>


// //                             <div>

// //                                 <label className="mb-1 block font-medium">
// //                                     End Time
// //                                 </label>

// //                                 <input
// //                                     type="datetime-local"
// //                                     name="endTime"
// //                                     value={formData.endTime}
// //                                     onChange={handleChange}
// //                                     className="w-full rounded-lg border p-3"
// //                                     required
// //                                 />

// //                             </div>

// //                         </div>


// //                         {/* STATUS */}

// //                         <div>

// //                             <label className="mb-1 block font-medium">
// //                                 Status
// //                             </label>

// //                             <select
// //                                 name="status"
// //                                 value={formData.status}
// //                                 onChange={handleChange}
// //                                 className="w-full rounded-lg border p-3"
// //                             >

// //                                 <option value="upcoming">
// //                                     Upcoming
// //                                 </option>

// //                                 <option value="ongoing">
// //                                     Ongoing
// //                                 </option>

// //                                 <option value="completed">
// //                                     Completed
// //                                 </option>

// //                                 <option value="cancelled">
// //                                     Cancelled
// //                                 </option>

// //                             </select>

// //                         </div>


// //                         {/* SUBMIT */}

// //                         <button
// //                             type="submit"
// //                             disabled={loading}
// //                             className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
// //                         >

// //                             {loading
// //                                 ? "Creating..."
// //                                 : "Create Stage"}

// //                         </button>

// //                     </form>

// //                 </div>

// //             </div>

// //         </div>
// //     );
// // }

// // export default CreateStage;

// import { useState, useEffect } from "react";
// import axios from "axios";

// import {
//     MapContainer,
//     TileLayer,
//     Marker,
//     Popup,
//     useMap,
//     useMapEvents
// } from "react-leaflet";

// import L from "leaflet";

// import "leaflet/dist/leaflet.css";

// // Fix Leaflet marker icons
// delete L.Icon.Default.prototype._getIconUrl;

// L.Icon.Default.mergeOptions({
//     iconRetinaUrl:
//         "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

//     iconUrl:
//         "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

//     shadowUrl:
//         "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
// });


// // =====================================
// // MAP CLICK COMPONENT
// // =====================================

// function LocationMarker({ setLocation }) {

//     useMapEvents({

//         click(e) {

//             const { lat, lng } = e.latlng;

//             setLocation({
//                 latitude: lat,
//                 longitude: lng
//             });

//         }

//     });

//     return null;
// }


// // =====================================
// // MAP CENTER UPDATE
// // =====================================

// function MapUpdater({ position }) {

//     const map = useMap();

//     useEffect(() => {

//         if (position) {
//             map.flyTo(position, 16);
//         }

//     }, [position, map]);

//     return null;
// }


// // =====================================
// // CREATE STAGE COMPONENT
// // =====================================

// function CreateStage() {

//     const [formData, setFormData] = useState({

//         title: "",
//         description: "",
//         location: "",
//         latitude: "",
//         longitude: "",
//         startTime: "",
//         endTime: "",
//         status: "upcoming"

//     });

//     const [loading, setLoading] = useState(false);

//     const [locationLoading, setLocationLoading] = useState(false);


//     // =====================================
//     // INPUT CHANGE
//     // =====================================

//     const handleChange = (e) => {

//         const { name, value } = e.target;

//         setFormData((prev) => ({
//             ...prev,
//             [name]: value
//         }));

//     };


//     // =====================================
//     // SELECT LOCATION FROM MAP
//     // =====================================

//     const setLocation = ({ latitude, longitude }) => {

//         setFormData((prev) => ({
//             ...prev,
//             latitude,
//             longitude
//         }));

//     };


//     // =====================================
//     // USE CURRENT LOCATION
//     // =====================================

//     const handleCurrentLocation = () => {

//         if (!navigator.geolocation) {

//             alert(
//                 "Geolocation is not supported by your browser"
//             );

//             return;
//         }

//         setLocationLoading(true);

//         navigator.geolocation.getCurrentPosition(

//             (position) => {

//                 const latitude = position.coords.latitude;

//                 const longitude = position.coords.longitude;

//                 setFormData((prev) => ({
//                     ...prev,
//                     latitude,
//                     longitude
//                 }));

//                 setLocationLoading(false);

//             },

//             (error) => {

//                 console.error(error);

//                 let message = "Unable to get your location.";

//                 if (error.code === 1) {
//                     message =
//                         "Location permission denied. Please allow location access.";
//                 }

//                 if (error.code === 2) {
//                     message =
//                         "Your current location is unavailable.";
//                 }

//                 if (error.code === 3) {
//                     message =
//                         "Location request timed out. Please try again.";
//                 }

//                 alert(message);

//                 setLocationLoading(false);

//             },

//             {
//                 enableHighAccuracy: true,
//                 timeout: 10000,
//                 maximumAge: 0
//             }

//         );

//     };


//     // =====================================
//     // SUBMIT STAGE
//     // =====================================

//     const handleSubmit = async (e) => {

//         e.preventDefault();

//         if (
//             formData.latitude === "" ||
//             formData.longitude === ""
//         ) {

//             alert("Please select a location on the map");

//             return;
//         }

//         if (
//             new Date(formData.endTime) <=
//             new Date(formData.startTime)
//         ) {

//             alert("End time must be after start time");

//             return;
//         }

//         try {

//             setLoading(true);

//             const response = await axios.post(

//                 "http://localhost:3000/api/stages",

//                 {
//                     ...formData,

//                     latitude: Number(formData.latitude),

//                     longitude: Number(formData.longitude)

//                 },

//                 {
//                     withCredentials: true
//                 }

//             );

//             console.log(response.data);

//             alert("Stage created successfully!");

//             setFormData({

//                 title: "",
//                 description: "",
//                 location: "",
//                 latitude: "",
//                 longitude: "",
//                 startTime: "",
//                 endTime: "",
//                 status: "upcoming"

//             });

//         } catch (error) {

//             console.error(error);

//             alert(
//                 error.response?.data?.message ||
//                 "Failed to create stage"
//             );

//         } finally {

//             setLoading(false);

//         }

//     };


//     // =====================================
//     // MAP POSITION
//     // =====================================

//     const selectedPosition =

//         formData.latitude !== "" &&
//         formData.longitude !== ""

//             ? [
//                 Number(formData.latitude),
//                 Number(formData.longitude)
//             ]

//             : null;


//     // =====================================
//     // UI
//     // =====================================

//     return (

//         <div className="min-h-screen bg-gray-100 p-4 md:p-8">

//             <div className="mx-auto max-w-5xl">

//                 <div className="rounded-2xl bg-white p-5 shadow-sm md:p-8">

//                     {/* HEADER */}

//                     <div className="mb-7">

//                         <h1 className="text-2xl font-bold text-gray-900">
//                             Create New Stage
//                         </h1>

//                         <p className="mt-1 text-sm text-gray-500">
//                             Add stage information and select its location.
//                         </p>

//                     </div>


//                     <form
//                         onSubmit={handleSubmit}
//                         className="space-y-6"
//                     >

//                         {/* TITLE */}

//                         <div>

//                             <label className="mb-2 block text-sm font-medium text-gray-700">
//                                 Stage Title
//                             </label>

//                             <input
//                                 type="text"
//                                 name="title"
//                                 value={formData.title}
//                                 onChange={handleChange}
//                                 placeholder="Enter stage title"
//                                 className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                                 required
//                             />

//                         </div>


//                         {/* DESCRIPTION */}

//                         <div>

//                             <label className="mb-2 block text-sm font-medium text-gray-700">
//                                 Description
//                             </label>

//                             <textarea
//                                 name="description"
//                                 value={formData.description}
//                                 onChange={handleChange}
//                                 placeholder="Enter stage description"
//                                 rows={4}
//                                 className="w-full resize-y rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                                 required
//                             />

//                         </div>


//                         {/* LOCATION NAME */}

//                         <div>

//                             <label className="mb-2 block text-sm font-medium text-gray-700">
//                                 Location Name
//                             </label>

//                             <input
//                                 type="text"
//                                 name="location"
//                                 value={formData.location}
//                                 onChange={handleChange}
//                                 placeholder="University Auditorium"
//                                 className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                                 required
//                             />

//                         </div>


//                         {/* MAP HEADER */}

//                         <div className="flex flex-wrap items-center justify-between gap-3">

//                             <div>

//                                 <h2 className="font-semibold text-gray-800">
//                                     Select Stage Location
//                                 </h2>

//                                 <p className="text-sm text-gray-500">
//                                     Click on the map to place the marker.
//                                 </p>

//                             </div>


//                             <button
//                                 type="button"
//                                 onClick={handleCurrentLocation}
//                                 disabled={locationLoading}
//                                 className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
//                             >

//                                 {locationLoading
//                                     ? "Getting Location..."
//                                     : "Use My Location"}

//                             </button>

//                         </div>


//                         {/* MAP */}

//                         <div className="h-[400px] overflow-hidden rounded-xl border border-gray-200">

//                             <MapContainer
//                                 center={[25.3960, 68.3578]}
//                                 zoom={13}
//                                 scrollWheelZoom={true}
//                                 className="h-full w-full"
//                             >

//                                 <TileLayer
//                                     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                                 />


//                                 <LocationMarker
//                                     setLocation={setLocation}
//                                 />


//                                 <MapUpdater
//                                     position={selectedPosition}
//                                 />


//                                 {selectedPosition && (

//                                     <Marker
//                                         position={selectedPosition}
//                                     >

//                                         <Popup>
//                                             Selected Stage Location
//                                         </Popup>

//                                     </Marker>

//                                 )}

//                             </MapContainer>

//                         </div>


//                         {/* COORDINATES */}

//                         <div className="grid gap-4 md:grid-cols-2">

//                             <div>

//                                 <label className="mb-2 block text-sm font-medium text-gray-700">
//                                     Latitude
//                                 </label>

//                                 <input
//                                     type="number"
//                                     value={formData.latitude}
//                                     readOnly
//                                     placeholder="Select map location"
//                                     className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-600 outline-none"
//                                 />

//                             </div>


//                             <div>

//                                 <label className="mb-2 block text-sm font-medium text-gray-700">
//                                     Longitude
//                                 </label>

//                                 <input
//                                     type="number"
//                                     value={formData.longitude}
//                                     readOnly
//                                     placeholder="Select map location"
//                                     className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-600 outline-none"
//                                 />

//                             </div>

//                         </div>


//                         {/* DATE AND TIME */}

//                         <div className="grid gap-4 md:grid-cols-2">

//                             <div>

//                                 <label className="mb-2 block text-sm font-medium text-gray-700">
//                                     Start Date & Time
//                                 </label>

//                                 <input
//                                     type="datetime-local"
//                                     name="startTime"
//                                     value={formData.startTime}
//                                     onChange={handleChange}
//                                     className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
//                                     required
//                                 />

//                             </div>


//                             <div>

//                                 <label className="mb-2 block text-sm font-medium text-gray-700">
//                                     End Date & Time
//                                 </label>

//                                 <input
//                                     type="datetime-local"
//                                     name="endTime"
//                                     value={formData.endTime}
//                                     onChange={handleChange}
//                                     className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
//                                     required
//                                 />

//                             </div>

//                         </div>


//                         {/* STATUS */}

//                         <div>

//                             <label className="mb-2 block text-sm font-medium text-gray-700">
//                                 Stage Status
//                             </label>

//                             <select
//                                 name="status"
//                                 value={formData.status}
//                                 onChange={handleChange}
//                                 className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
//                             >

//                                 <option value="upcoming">
//                                     Upcoming
//                                 </option>

//                                 <option value="ongoing">
//                                     Ongoing
//                                 </option>

//                                 <option value="completed">
//                                     Completed
//                                 </option>

//                                 <option value="cancelled">
//                                     Cancelled
//                                 </option>

//                             </select>

//                         </div>


//                         {/* SUBMIT */}

//                         <div className="flex justify-end border-t border-gray-100 pt-5">

//                             <button
//                                 type="submit"
//                                 disabled={loading}
//                                 className="rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
//                             >

//                                 {loading
//                                     ? "Creating Stage..."
//                                     : "Create Stage"}

//                             </button>

//                         </div>

//                     </form>

//                 </div>

//             </div>

//         </div>

//     );

// }

// export default CreateStage;



import { useState, useEffect } from "react";
import axios from "axios";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

// =====================================
// THEMES
// =====================================

const THEMES = {
  dark: {
    bg: "#0B1B33",
    bgAlt: "#101F3A",
    surface: "#122140",
    surfaceStrong: "#17284A",
    border: "rgba(255,255,255,0.10)",
    text: "#EDEFF4",
    textMuted: "#93A2BC",
    accent: "#63A4FF",
    accentStrong: "#2F6FE0",
    accentSoft: "rgba(99,164,255,0.16)",
    navBg: "#0B1B33",
    onAccent: "#0B1B33",
  },

  light: {
    bg: "#F4F8FC",
    bgAlt: "#EAF1FA",
    surface: "#FFFFFF",
    surfaceStrong: "#EEF3FB",
    border: "rgba(11,27,51,0.10)",
    text: "#0E1F3D",
    textMuted: "#54638A",
    accent: "#2560E0",
    accentStrong: "#173F99",
    accentSoft: "rgba(37,96,224,0.10)",
    navBg: "#F4F8FC",
    onAccent: "#FFFFFF",
  },
};

// =====================================
// FIX LEAFLET MARKER ICON
// =====================================

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// =====================================
// MAP CLICK
// =====================================

function LocationMarker({ setLocation }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;

      setLocation({
        latitude: lat,
        longitude: lng,
      });
    },
  });

  return null;
}

// =====================================
// UPDATE MAP POSITION
// =====================================

function MapUpdater({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 16);
    }
  }, [position, map]);

  return null;
}

// =====================================
// CREATE STAGE
// =====================================

function CreateStage() {
  const [theme, setTheme] = useState("dark");

  const t = THEMES[theme];
  const isDark = theme === "dark";

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    latitude: "",
    longitude: "",
    startTime: "",
    endTime: "",
    status: "upcoming",
  });

  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);

  // =====================================
  // INPUT CHANGE
  // =====================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================
  // MAP LOCATION
  // =====================================

  const setLocation = ({ latitude, longitude }) => {
    setFormData((prev) => ({
      ...prev,
      latitude,
      longitude,
    }));
  };

  // =====================================
  // CURRENT LOCATION
  // =====================================

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setLocationLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setFormData((prev) => ({
          ...prev,
          latitude,
          longitude,
        }));

        setLocationLoading(false);
      },

      (error) => {
        console.error(error);

        let message = "Unable to get your location.";

        if (error.code === 1) {
          message =
            "Location permission denied. Please allow location access.";
        }

        if (error.code === 2) {
          message = "Your current location is unavailable.";
        }

        if (error.code === 3) {
          message =
            "Location request timed out. Please try again.";
        }

        alert(message);

        setLocationLoading(false);
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  // =====================================
  // SUBMIT
  // =====================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.latitude === "" ||
      formData.longitude === ""
    ) {
      alert("Please select a location on the map");
      return;
    }

    if (
      new Date(formData.endTime) <=
      new Date(formData.startTime)
    ) {
      alert("End time must be after start time");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:3000/api/stage/create",
        {
          ...formData,

          latitude: Number(formData.latitude),
          longitude: Number(formData.longitude),
        },
        {
          withCredentials: true,
        }
      );

      console.log(response.data);

      alert("Stage created successfully!");

      setFormData({
        title: "",
        description: "",
        location: "",
        latitude: "",
        longitude: "",
        startTime: "",
        endTime: "",
        status: "upcoming",
        createdBy:"6ac0e265f3917dd2ca4f0aae"
      });
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to create stage"
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // MAP POSITION
  // =====================================

  const selectedPosition =
    formData.latitude !== "" &&
    formData.longitude !== ""
      ? [
          Number(formData.latitude),
          Number(formData.longitude),
        ]
      : null;

  // =====================================
  // INPUT STYLE
  // =====================================

  const inputStyle = {
    background: t.surfaceStrong,
    borderColor: t.border,
    color: t.text,
  };

  // =====================================
  // UI
  // =====================================

  return (
    <div
      className="min-h-screen p-4 transition-colors duration-300 md:p-8"
      style={{
        background: t.bg,
        color: t.text,
      }}
    >
      <div className="mx-auto max-w-5xl">

        {/* HEADER */}

        <div className="mb-6 flex items-center justify-between">

          <div>
            <h1
              className="text-2xl font-bold"
              style={{ color: t.text }}
            >
              Create New Stage
            </h1>

            <p
              className="mt-1 text-sm"
              style={{ color: t.textMuted }}
            >
              Add stage information and select its location.
            </p>
          </div>

          {/* THEME BUTTON */}

          <button
            type="button"
            onClick={() =>
              setTheme(isDark ? "light" : "dark")
            }
            className="flex h-10 w-10 items-center justify-center rounded-xl border transition"
            style={{
              background: t.surface,
              borderColor: t.border,
              color: t.text,
            }}
            title="Toggle theme"
          >
            {isDark ? "☀️" : "🌙"}
          </button>

        </div>

        {/* MAIN CARD */}

        <div
          className="rounded-2xl border p-5 shadow-xl md:p-8"
          style={{
            background: t.surface,
            borderColor: t.border,
          }}
        >

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* TITLE */}

            <div>
              <label
                className="mb-2 block text-sm font-medium"
                style={{ color: t.text }}
              >
                Stage Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter stage title"
                className="w-full rounded-xl border px-4 py-3 outline-none transition focus:ring-2"
                style={inputStyle}
                required
              />
            </div>

            {/* DESCRIPTION */}

            <div>
              <label
                className="mb-2 block text-sm font-medium"
                style={{ color: t.text }}
              >
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter stage description"
                rows={4}
                className="w-full resize-y rounded-xl border px-4 py-3 outline-none transition"
                style={inputStyle}
                required
              />
            </div>

            {/* LOCATION NAME */}

            <div>
              <label
                className="mb-2 block text-sm font-medium"
                style={{ color: t.text }}
              >
                Location Name
              </label>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="University Auditorium"
                className="w-full rounded-xl border px-4 py-3 outline-none transition"
                style={inputStyle}
                required
              />
            </div>

            {/* MAP HEADER */}

            <div className="flex flex-wrap items-center justify-between gap-3">

              <div>
                <h2
                  className="font-semibold"
                  style={{ color: t.text }}
                >
                  Select Stage Location
                </h2>

                <p
                  className="text-sm"
                  style={{ color: t.textMuted }}
                >
                  Click on the map to place the marker.
                </p>
              </div>

              {/* CURRENT LOCATION */}

              <button
                type="button"
                onClick={handleCurrentLocation}
                disabled={locationLoading}
                className="rounded-xl px-4 py-2.5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60"
                style={{
                  background: t.accent,
                  color: t.onAccent,
                }}
              >
                {locationLoading
                  ? "Getting Location..."
                  : "Use My Location"}
              </button>

            </div>

            {/* MAP */}

            <div
              className="h-[400px] overflow-hidden rounded-xl border"
              style={{
                borderColor: t.border,
              }}
            >
              <MapContainer
                center={[25.396, 68.3578]}
                zoom={13}
                scrollWheelZoom={true}
                className="h-full w-full"
              >

                <TileLayer
                  attribution='&copy; OpenStreetMap contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <LocationMarker
                  setLocation={setLocation}
                />

                <MapUpdater
                  position={selectedPosition}
                />

                {selectedPosition && (
                  <Marker position={selectedPosition}>
                    <Popup>
                      Selected Stage Location
                    </Popup>
                  </Marker>
                )}

              </MapContainer>
            </div>

            {/* MAP HELP */}

            <div
              className="rounded-xl px-4 py-3 text-sm"
              style={{
                background: t.accentSoft,
                color: t.accent,
              }}
            >
              📍 Click anywhere on the map or use
              <strong className="mx-1">
                Use My Location
              </strong>
              to select the stage location.
            </div>

            {/* COORDINATES */}

            <div className="grid gap-4 md:grid-cols-2">

              <div>
                <label
                  className="mb-2 block text-sm font-medium"
                  style={{ color: t.text }}
                >
                  Latitude
                </label>

                <input
                  type="number"
                  value={formData.latitude}
                  readOnly
                  placeholder="Select map location"
                  className="w-full rounded-xl border px-4 py-3 outline-none"
                  style={{
                    background: t.bgAlt,
                    borderColor: t.border,
                    color: t.textMuted,
                  }}
                />
              </div>

              <div>
                <label
                  className="mb-2 block text-sm font-medium"
                  style={{ color: t.text }}
                >
                  Longitude
                </label>

                <input
                  type="number"
                  value={formData.longitude}
                  readOnly
                  placeholder="Select map location"
                  className="w-full rounded-xl border px-4 py-3 outline-none"
                  style={{
                    background: t.bgAlt,
                    borderColor: t.border,
                    color: t.textMuted,
                  }}
                />
              </div>

            </div>

            {/* DATE/TIME */}

            <div className="grid gap-4 md:grid-cols-2">

              <div>
                <label
                  className="mb-2 block text-sm font-medium"
                  style={{ color: t.text }}
                >
                  Start Date & Time
                </label>

                <input
                  type="datetime-local"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="w-full rounded-xl border px-4 py-3 outline-none"
                  style={inputStyle}
                  required
                />
              </div>

              <div>
                <label
                  className="mb-2 block text-sm font-medium"
                  style={{ color: t.text }}
                >
                  End Date & Time
                </label>

                <input
                  type="datetime-local"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className="w-full rounded-xl border px-4 py-3 outline-none"
                  style={inputStyle}
                  required
                />
              </div>

            </div>

            {/* STATUS */}

            <div>
              <label
                className="mb-2 block text-sm font-medium"
                style={{ color: t.text }}
              >
                Stage Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-xl border px-4 py-3 outline-none"
                style={inputStyle}
              >
                <option value="upcoming">
                  Upcoming
                </option>

                <option value="ongoing">
                  Ongoing
                </option>

                <option value="completed">
                  Completed
                </option>

                <option value="cancelled">
                  Cancelled
                </option>
              </select>
            </div>

            {/* SUBMIT */}

            <div
              className="flex justify-end border-t pt-5"
              style={{
                borderColor: t.border,
              }}
            >
              <button
                type="submit"
                disabled={loading}
                className="rounded-xl px-7 py-3 font-semibold transition disabled:cursor-not-allowed disabled:opacity-60"
                style={{
                  background: t.accent,
                  color: t.onAccent,
                }}
              >
                {loading
                  ? "Creating Stage..."
                  : "Create Stage"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateStage;

