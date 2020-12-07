function isObject(obj) {
  return typeof obj === 'object' && Object.keys(obj).length;
}

function pathConcat(path, delimiter = '') {
  return path.reduce((acc, pathPart) => acc + delimiter + pathPart);
}

function getValueFromInput({ path }) {
  const dashPath = pathConcat(path, '-');
  const element = document.getElementById(dashPath);
  return element && element.value;
}

function setValue(obj, path, value) {
  // courtesy of Dieter Gribnitz (https://stackoverflow.com/a/20240290/6387812)
  let o = obj;
  while (path.length - 1) {
    const n = path.shift();
    if (!(n in o)) o[n] = {};
    o = o[n];
  }
  o[path[0]] = value;
}

function addFormInputs({ form, variables, prependWith = [] }) {
  try {
    if (variables && Object.keys(variables).length) {
      Object.keys(variables).forEach((propertyName) => {
        const variable = variables[propertyName];

        if (isObject(variable)) {
          addFormInputs({
            form,
            variables: variable,
            prependWith: [...prependWith, propertyName]
          });
        } else {
          const dataLabel = pathConcat([...prependWith, propertyName], '.');
          const inputId = pathConcat([...prependWith, propertyName], '-');
          form.innerHTML += `
            <div>
              <label for="${propertyName}">
                <input id=${inputId} name="${propertyName}" value="${variable}" />
              </label>
              <span>${dataLabel}</span>
            </div>
          `;
        }
      });
    }
  } catch (err) {
    throw new Error(err);
  }
}

export function handleFormInputs({ endpoints, select, form, result }) {
  const endpointName = select.selectedOptions[0].value;
  const { variables } = endpoints[endpointName];
  form.innerHTML = '';
  result.innerText = endpoints[endpointName].result;

  addFormInputs({ form, variables });
}

export function getBodyProperties({ variables, body = {}, propertyPath = [] }) {
  Object.keys({ ...variables }).forEach((propertyName) => {
    const variable = variables[propertyName];
    const fullPath = [...propertyPath, propertyName];

    if (isObject(variable)) {
      getBodyProperties({
        variables: variable,
        body,
        propertyPath: fullPath
      });
    } else {
      const valueFromInput = getValueFromInput({ path: fullPath });

      if (valueFromInput) {
        setValue(body, fullPath, valueFromInput);
      }
    }
  });

  return body;
}
