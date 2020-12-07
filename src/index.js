import { handleFormInputs, getBodyProperties } from '/util';

const endpoints = {
  // configure endpoints and the default values of their required inputs
  'get-countries': {
    variables: null,
    method: 'GET',
    result: ''
  },
  'get-provinces': {
    variables: { countryShortName: 'US' },
    method: 'POST',
    result: ''
  },
  'get-multipass-url': {
    variables: {
      customerData: {
        email: 'example@getnacelle.com',
        return_to: 'https://example.com/account'
      }
    },
    method: 'POST',
    result: ''
  }
};

async function fetchFromFunctionEndpoint({ endpoint }) {
  const url = `/api/${endpoint}`;
  const { method, variables } = endpoints[endpoint];
  const bodyProperties = JSON.stringify(getBodyProperties({ variables }));
  const body = method === 'POST' ? bodyProperties : null;
  const options = { method, body };

  const response = await fetch(url, options)
    .then((res) => {
      const responseType = res.headers.get('content-type');

      if (responseType.startsWith('text/html')) {
        return res.text();
      }

      if (responseType.startsWith('application/json')) {
        return res.json();
      }
    })
    .catch((err) => {
      throw new Error(err);
    });

  return response;
}

// Create elements and assign attributes, event handlers, etc.
const formSection = document.createElement('div');
const form = document.createElement('form');
formSection.appendChild(form);

const result = document.createElement('pre');

const select = document.createElement('select');
select.setAttribute('name', 'endpoint');
select.innerHTML = Object.keys(endpoints).map(
  (endpoint) => `<option>${endpoint}</option>`
);
select.onchange = () => handleFormInputs({ endpoints, select, form, result });

const fetchButton = document.createElement('button');
fetchButton.innerText = 'Fetch Data';
fetchButton.onclick = async function () {
  const endpoint = select.selectedOptions[0].value;
  const response = await fetchFromFunctionEndpoint({ endpoint });

  endpoints[endpoint].result = JSON.stringify(response, null, 2);
  result.innerText = endpoints[endpoint].result;
};

// Add elements to the DOM
const controls = document.getElementById('controls');
const results = document.getElementById('results');

controls.appendChild(select);
controls.appendChild(fetchButton);
controls.appendChild(formSection);
results.appendChild(result);
