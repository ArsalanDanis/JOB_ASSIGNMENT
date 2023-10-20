

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WorldTimeComponent = () => {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [countryTime, setCountryTime] = useState(null);
    const [isRunning, setIsRunning] = useState(false);
    const [pausedTime, setPausedTime] = useState(0);
    const [lastPauseTime, setLastPauseTime] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {

        fetch("http://worldtimeapi.org/api/timezone")
            .then((response) => response.json())
            .then((data) => {
                setCountries(data);
            })
            .catch((error) => {
                console.error("Error fetching countries:", error);
            });
    }, []);

    useEffect(() => {
        let timer;
        if (isRunning) {
            timer = setInterval(() => {
                setCountryTime((prevCountryTime) => {
                    if (prevCountryTime) {
                        const currentTime = new Date(prevCountryTime.getTime() + 1000);
                        return currentTime;
                    }
                    return null;
                });
            }, 1000);
        }

        return () => {
            clearInterval(timer);
        };
    }, [isRunning]);

    const handleCountryChange = (event) => {
        const selectedCountry = event.target.value;
        setSelectedCountry(selectedCountry);
        fetch(`http://worldtimeapi.org/api/timezone/${selectedCountry}`)
            .then((response) => response.json())
            .then((data) => {
                const countryTime = new Date(data.utc_datetime);
                setCountryTime(countryTime);
                setIsRunning(true);
            })
            .catch((error) => {
                console.error("Error while fetching current time:", error);
            });
    };

    const toggleClock = () => {
        if (isRunning) {
            setLastPauseTime(new Date());
            setIsRunning(false);
        } else {
            setIsRunning(true);
        }
    };

    return (
        <div className="flex flex-col md:flex-row md:justify-between items-center m-4">
            <button onClick={() => navigate("/")} className="bg-[navy] pt-2 pb-2 pr-5 pl-5 text-white rounded-lg mb-2 md:mb-0">Back</button>
            <div className="middle flex flex-col md:flex-row justify-center items-center gap-5">
                <div>
                    <select className="bg-[#c7eec7] p-3 font-extrabold" value={selectedCountry} onChange={handleCountryChange}>
                        <option value="">Select a country</option>
                        {countries.map((country) => (
                            <option key={country} value={country}>
                                {country}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="bg-[navy] text-white p-3 m-2 rounded-lg">
                    {countryTime !== null ? (
                        <div>
                            <p><span>{countryTime.toISOString().slice(0, 10)} </span><span>{countryTime.toLocaleString("en-US", { weekday: "long" }).slice(0, 3).toUpperCase()}</span></p>
                            <p className="text-[30px] mt-0">{countryTime.toISOString().slice(11, 19)}</p>
                        </div>
                    ) : (
                        <div>
                            <p><span>YYYY-MM-DD</span> <span>DAY</span></p>
                            <p className="text-[30px] mt-0">00:00:00</p>
                        </div>
                    )}
                </div>
            </div>
            <div>
                <button
                    className={`rounded-tl-[15px] rounded-br-[15px] pr-6 pl-6 pt-3 pb-3 text-white ${isRunning ? "bg-[#f72e2e]" : "bg-[#4CAF50]"} border-none`}
                    onClick={toggleClock}
                >
                    {isRunning ? "Pause" : "Start"}
                </button>
            </div>
        </div>
    )
};

export default WorldTimeComponent;
