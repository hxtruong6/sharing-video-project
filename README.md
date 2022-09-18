
# Dev Project

**Link:** https://sharing-video-remi-4zwsvgy0p-hxtruong6.vercel.app/

> Due to the cost of Google cloud SQL, I stopped this service, so there is no database for testing temporarily.

**Describtion**:
We have a web application that allows users to share youtube videos. As a developer, you will help build the client and server-side logic for user can interact with it.. 

**Required Features:**
- Register: As a new user, I want to create an account and sign in by entering the username and password for the first time. (Picture 1)
- Login: As a registered user, I want to sign in by entering the username and password. (Picture 1)
- Share movie: As a signed in user, I want to share a youtube movie by clicking “Share a movie” button (Picture 2) and filling the share form (Picture 3).
- See movie list: As a visitor, I want to see a list of all shared movies. (Picture 1) (no need to display the number of up/down votes)

**Technical requirements:**
- Use Git and commit often
- Have integration test
- Have unit test

## Contents
1. Tech stack
2. Features
3. UI
4. For Testing
    - Run Unit Test
    - Run Intergration Test


## 1. Tech stack

- Font-end: Nextjs, reactjs
- Back-end: Nodejs
- Other: Docker, Google Cloud Run 


**Cloud Run:** to ensure the reliability of the server and that have the ability to scalable when a large of user


**GIT:**

There are branches in git manage code for straightforward that are includes of: dev, master, prod.
- Dev branch is used for development
- Master is used for merged code after developing any new features.
- Prod is used for deploying code to production.
Because this is a small project so this project is only used 3 three simple branches. It can be divided into branches which are followed by features.
Some other branches like testing (for CICD), and review. 

## 2. Features
- Register, login, logout 
- List all public video from all user
- Sharing video URL by user
- Display only videos of current user
- Like/dislike, share by, count like/dislike
- Pagination when have a huge number of data.

Some future works can be noticed:
- Get Info video from Youtube API to display correct and full information video.
- Improve performance.
- Set up concurrent processing in backend
- Auto restart server when crash (can be handle by google cloud)
- Can be deployed on Kubernetes K8s for scaling and rebanlacing
- Improve security (DNS, Sql injection,..)

## 3. UI

![image](https://user-images.githubusercontent.com/24609363/190882653-019f8065-cc46-41af-a0db-11d48dde5b99.png)

![image](https://user-images.githubusercontent.com/24609363/190882671-c7e2ba4c-a836-4199-a75e-319246194706.png)

![image](https://user-images.githubusercontent.com/24609363/190882677-d11dc458-1f0a-43af-af58-2e7a504e9014.png)

![image](https://user-images.githubusercontent.com/24609363/190882686-b486877e-c036-4055-8334-5a61c0188454.png)





## 4. For Testing
	It is required to create an independent testing database to guarantee that there are no issues occurring when running tests.
![image](https://user-images.githubusercontent.com/24609363/190882689-26a1aa2b-688f-42a4-8a33-ce715d574a43.png)

![image](https://user-images.githubusercontent.com/24609363/190882695-03bcac72-90f3-4099-873e-8c5c7726403e.png)


### Run Unit Test

![image](https://user-images.githubusercontent.com/24609363/190882704-7389d165-b775-41a7-a26a-18b022e94a5d.png)


### Run Intergration Test

![image](https://user-images.githubusercontent.com/24609363/190882707-14cf67af-458d-4daa-817d-61cf0ed619a5.png)


# Contact
Email|Skype: hxtruong6@gmail.com

LinkedIn: https://www.linkedin.com/in/hxtruong6/
