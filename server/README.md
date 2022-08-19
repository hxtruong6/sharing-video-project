# Server

## API

### Standard response

1.  Success

    ```
        {
            status: ApiStatus.Success,
            data,
        }
    ```

2.  Fail:
    This response is occurred when there are errors from user request (not belong to internal server error)

    ```
       {
           status: ApiStatus.Fail,
           data: error
       }
    ```

3.  Error:
    When server has unexpected error.

    ```
        {
            status: ApiStatus.Error,
            message: error.message || message,
            code: codeStatus,
            data: error
        }
    ```

### Feature api

1.  User

    -   [POST] Login: `/api/user/login`

              Input: {email, password}
              Ouput: user, token}

    -   [POST] Register: `/api/user/register`

              Input: {email, password}
              Ouput: {user}

2.  Video

    -   [GET] Get All: `/api/video`

        -   Get all sharing video (don't need to authenticated user)

                  Input: {}
                  Ouput: { videos: [], total, page, size }

    -   [GET] Get video by user: `/api/video/list`

        -   Get all sharing video for requested user

                  Header: {authorization}
                  Input: {}
                  Ouput: { videos: [], total, page, size }

    -   [POST] : `/api/video`

              Header: {authorization}
              Input: {url}
              Ouput: **Standard response**

    -   [PUT] : `/api/video/`

        -   Change like status of requested user
        -   Change public video or not of requested user

                  Header: {authorization}
                  Input: {like}
                  Ouput: **Standard response**

3.  Playlist

    Suppose that each user have own his playlist which he wants to share to other. And that playlist is only show public his sharing videos.

    For first user who don't know any playlist server just show all public video that is being in database.

    -   [GET] Get by user: `/api/video/:playlistUrl`

        -   Get all public video of specific user for non-authenticated user.

                  Input: {}
                  Ouput: { videos: [], total, page, size }

## Database

## Run:

```
pnpm install
node server.js
```

1. build code: `npm build` --> create a folder name: **build**
2. create `.env` file
    ```
    DB_URL_DEV=postgresql://postgres:postgres@127.0.0.1:5432/my-db
    JWT_SECRET=12345
    NODE_ENV=development
    ```
3. ```
   cd build/
   npm install
   node server.js
   ```

_Note:_ `pnpm` can be alternated by `npm`

Priority:

    1. in command: NODE_ENV=development nodemon server.ts
    2. in .env file
