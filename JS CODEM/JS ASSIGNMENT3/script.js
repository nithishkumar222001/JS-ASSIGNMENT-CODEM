const routeMap = {
  "Tirunelveli->Madurai": 2,
  "Madurai->Tirunelveli": 2,
  "Madurai->Trichy": 2,
  "Trichy->Chennai": 3,
  "Madurai->Coimbatore": 3,
  "Coimbatore->Chennai": 3,
  "Madurai->Salem": 3,
  "Salem->Bangalore": 2,
  "Chennai->Bangalore": 2,
  "Bangalore->Mumbai": 3,
  "Chennai->Mumbai": 5,
  "Coimbatore->Bangalore": 3,
};

function calculateDeliveryDate() {
  const startLocation = document.getElementById("startLocation").value;
  const endLocation = document.getElementById("endLocation").value;
  const startDate = new Date(document.getElementById("startDate").value);

  const result = calculateDelivery(startLocation, endLocation, startDate);

  if (result) {
    document.getElementById("result").innerHTML = result;
  } else {
    document.getElementById("result").innerHTML = "Route not found";
  }
}

function calculateDelivery(start, end, startDate) {
  const daysMap = {};

  const queue = [{ location: start, days: 0, path: [] }];

  while (queue.length > 0) {
    const current = queue.shift();

    if (current.location === end) {
      return buildResult(current, startDate);
    }

    for (const route in routeMap) {
      const [routeStart, routeEnd] = route.split("->");

      if (routeStart === current.location) {
        const newDays = current.days + routeMap[route];
        const newLocation = routeEnd;

        const newDate = new Date(startDate);
        newDate.setDate(startDate.getDate() + newDays);

        if (newDate.getDay() !== 0 && newDate.getDay() !== 6) {
          if (!daysMap[newLocation] || newDays < daysMap[newLocation]) {
            daysMap[newLocation] = newDays;
            queue.push({
              location: newLocation,
              days: newDays,
              path: [...current.path, routeStart],
            });
          }
        }
      }
    }
  }

  return null;
}

function buildResult(current, startDate) {
  const deliveryDate = new Date(startDate);
  deliveryDate.setDate(startDate.getDate() + current.days);

  const formattedPath = current.path.join(" -> ");
  const result = `${formattedPath} -> ${current.location}`;
  return `${result}. ${
    current.days
  } days. ${startDate.toDateString()} Start -> Arrive on ${deliveryDate.toDateString()}`;
}
