import React from 'react';

// function that submits the user response
function createGroup() {
    // code here
}

const link = "random link here";

const Create = () => {
    return (
        <div>
            <h3>Create page</h3>
            <div>
                <ul class="list-group container-fluid">
                    <li class="list-group-item table-title">Invite Link: {link}</li>
                    <li class="list-group-item">
                        <div class="mb-3 row">
                            <div class="mb-3">
                                <label for="formFile" class="form-label">Group Image</label>
                                <input class="form-control" type="file" id="formFile"></input>
                            </div>
                            <label for="groupName" class="col-sm-2 col-form-label">Group Name</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="groupName"></input>
                            </div>
                        </div>
                    </li>
                    <li class="list-group-item reply" onClick={createGroup}>Create Group</li>
                </ul>
            </div>
        </div>
    );
}
export default Create;