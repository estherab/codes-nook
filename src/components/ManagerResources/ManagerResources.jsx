import { useState } from "react";
import useApiJson from "../../hooks/apiJson.hook";

import "./ManagerResources.scss";

const INITIAL_STATE = {
  name: "",
  category: "",
  url: "",
  description: "",
};

const ManagerResources = () => {
  const ApiJson = useApiJson();
  const [state, setState] = useState(INITIAL_STATE);
  const [category, setCategory] = useState('htmlcss');

  const submitForm = (ev) => {
    ev.preventDefault();

    ApiJson.postCategory(category, 'resources', state)
  };

  return (
    <>
     <div className='manager__container'>
        <h1>Upload Resource</h1>
        <form onSubmit={submitForm}>
          <div className='top'>
            <div className='top__name'>
              <label>Title*</label>
              <input
                type='text'
                placeholder='Input your first name'
                required
                value={state.title}
                name='title'
                onChange={(ev) =>
                  setState({ ...state, [ev.target.name]: ev.target.value })
                }
              />
            </div>

            <div className='top__category'>
              <label>tag*</label>
              <input
                type='text'
                placeholder='Hooks, Component, Library, ...'
                required
                value={state.tag}
                name='tag'
                onChange={(ev) =>
                  setState({ ...state, [ev.target.name]: ev.target.value })
                }
              />
            </div>
          </div>

          <div className='top'>
            <div className='top__name'>
            <label>LINK*</label>
            <input
              type='url'
              placeholder='Link to the source'
              required
              value={state.link}
              name='link'
              onChange={(ev) =>
                setState({ ...state, [ev.target.name]: ev.target.value })
              }
            />
            </div>

            <div className='top__category'>
            <label>category*</label>
              <select 
                defaultValue={{value : "htmlcss"}}
                required
                value={category}
                name='category'
                onChange={(ev) => setCategory(ev.target.value)}
              >
                <option value="htmlcss" selected>Html y Css</option>
                <option value="javascript">Javascript</option>
                <option value="angular">Angular</option>
                <option value="react">React</option>
              </select>
            </div>
          </div>

          <div className='bottom'>
            <label>Description</label>
            <textarea
              placeholder='Input description of the source'
              value={state.description}
              name='description'
              onChange={(ev) =>
                setState({ ...state, [ev.target.name]: ev.target.value })
              }
            />
          </div>

          <div className='button__container'>
            <button className='button__primary' type="submit">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ManagerResources;
