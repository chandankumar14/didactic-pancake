import React, { useEffect, useState } from "react";
import { ExternalLink } from "react-external-link";
const PAGE_Number = 1;
function App() {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(PAGE_Number);
  // calling API using useEffect react hook lifecycle
  const getApiCall = async () => {
    const data = await fetch(
      `https://api.github.com/repos/neovim/neovim/pulls?page=${page}&per_page=30`
    );
    const response = await data.json();
    setList(response);
  };
  useEffect(() => {
    getApiCall();
  }, [page]);

  const scrolllToEnd = () => {
    setPage(page + 1);
  };
  window.onscroll = function () {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      scrolllToEnd();
    }
  };
  return (
    <div className="App">
      <h1> -----GitHub User Data ------ </h1>

      <div className="data">
        <table className="table table table-bordered ">
          <thead>
            <tr>
              <th>Title</th>
              <th>Base Branch</th>
              <th>Author Branch</th>
              <th>Author</th>
              <th>Created On</th>
              <th> Labels</th>
              <th> Details</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item) => {
              return (
                <tr>
                  <td>{item.title}</td>
                  <td>{item.base.ref}</td>
                  <td>{item.author_association}</td>
                  <td>{item.user.login}</td>
                  <td>{item.created_at}</td>
                <td>
                    {item.labels.map((labelsItem) => {
                      return (
                        <ul>
                          <li>{labelsItem.name}</li>
                        </ul>
                      );
                    })}
                  </td>
                  <td>
                    <ExternalLink href={item.html_url} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
