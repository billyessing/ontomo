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
  const response = await fetch(`${BASE_URL}/meetings`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Error creating room: ${errorMessage}`);
  }

  return response.json();
}

exports.createRoom = async (request, response) => {
  try {
    const roomData = await createRoom();
    console.log("Room URL:", roomData.roomUrl);
    response.json(roomData);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: error.message });
  }
};

