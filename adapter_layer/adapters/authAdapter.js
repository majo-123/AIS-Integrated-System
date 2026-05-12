export const create = async (profile) => {
  const transformedProfile = {
    name: profile.firstName + " " + profile.lastName,
    birthdate: profile.dob,
    program: profile.course + " " + profile.major,
    address: profile.address,
    studentStatus: profile.status,
  };

  const response = await fetch(
    "https://ais-simulated-legacy.onrender.com/api/students",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transformedProfile),
    },
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to send data to AIS");
  }

  return result;
};

export const findById = async (studentId) => {
  const cleanId = String(studentId).trim();

  const response = await fetch(
    `https://ais-simulated-legacy.onrender.com/api/students/${cleanId}`,
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch student from AIS");
  }

  return {
    id: data._id,
    name: data.name,
    birthdate: data.birthdate,
    program: data.program,
    address: data.address,
    studentStatus: data.studentStatus,
  };
};
