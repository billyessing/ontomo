const fetch = require("cross-fetch");
const dotenv = require("dotenv")
dotenv.config()

const API_KEY = process.env.WHEREBY_API_KEY;
const BASE_URL = "https://api.whereby.dev/v1";

const data = {
  endDate: "2099-02-18T14:23:00.000Z",
  fields: ["hostRoomUrl"],
  recording: { 
    type: "local",
    startTrigger: "none",
    destination: null
  }
};


async function createRoom() {
  const res = await fetch(`${BASE_URL}/meetings`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(`Error creating room: ${errorMessage}`);
  }

  return res.json();
}

exports.createRoom = async (req, res) => {
  try {
    const roomData = await createRoom();
    console.log("Room URL:", roomData.roomUrl);
    res.json(roomData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

