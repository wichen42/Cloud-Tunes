# Production README


**<ins>Background<ins>**

<br>

Cloud-Tunes is a SoundCloud clone, an online music distributiuon platform and music sharing website. Cloud-Tunes is implemented with React frontend, Ruby on Rails backend, PostgreSQL database, and Amazon S3 Cloud Storage. 

[Cloud-Tunes](https://cloud-tunes.herokuapp.com/)

<br>

**<ins>Features<ins>**

- Users are able to upload audio tracks.
- View User Profile Page that displays User Audio Tracks.
- Edit User profile page.
- Comments on User Tracks.
- Audio Playback

<br>

** Login and Signup Modals**

<br>

- Login Modals dynamically change based on entered username. If there is a pre-existing account with the inputed username, modal will display a welcome back form.

<br>

![image](https://user-images.githubusercontent.com/103459101/213255215-2465aee3-113e-4e13-aa13-84506b12f0c1.png)

<br>

```javascript
 useEffect(() => {
        dispatch(usersActions.fetchUsers());
    }, [signupModal, username])

    if (!open) return null;
    if (sessionUser) return <Redirect to={"/"}/>;


    const handleLogin = (e) => {
        e.preventDefault();
        if (usernames.includes(username)) {
            setWelcomeModal(true);
        } else {
            setSignupModal(true);
        }
    }

    const handleOverlayClick = (e) => {
        e.preventDefault();
        setUsername("");
        onClose();
        setSignupModal(false);
        setWelcomeModal(false);
    }
    
    return (
        
            <div className="modal-overlay" onClick={(e) => handleOverlayClick(e)}>
            <SignupForm signupOpen={signupModal} signupClose={() => setSignupModal(false)} username={username} />
            <WelcomeBack welcomeOpen={welcomeModal} welcomeClose={() => setWelcomeModal(false)} username={username}/>
            <div className="modal-container" onClick={(e) => {e.stopPropagation()}}>
                    <div className="close-btn-container">
                        <p className="close-btn"
                            onClick={(e) => handleOverlayClick(e)}
                            >X
                        </p>
                    </div>
            ...
```

<br>

**User Profile Page**

<br>

![image](https://user-images.githubusercontent.com/103459101/197086371-0183e6bf-91c6-45d4-857f-765a8c12b69e.png)

<br>

- Users are able to customize and make their profile page their own. When logged in, User can change their About Section, location, profile image, banner image, as well as upload their own audio files. Other users are able to create accounts and leave their comments on your uploaded tracks and can follow a user or like their tracks. Images and audio tracks are converted into formData and stored in Amazon S3 buckets.  

<br>

```javascript
    const handleProfileImage = (e) => {
        const iconFile = e.currentTarget.files[0];
        setProfileImage(iconFile);
    }

    const handleBannerImage = (e) => {
        const bannerFile = e.currentTarget.files[0];
        setBannerImage(bannerFile);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // user info update
        const update = {about, location}

        const res = await csrfFetch(`/api/users/${sessionUser.id}`, {
            method: "PATCH",
            body: JSON.stringify(update)
        });

        const data = await res.json();

        // user profile and banner update

        const profileData = new FormData();
        const bannerData = new FormData();

        if (profileImage) {
            profileData.append('user[image]', profileImage);
        }

        if (bannerImage) {
            bannerData.append('user[banner]', bannerImage);
        }

        const profileRes = await csrfFetch(`/api/users/${sessionUser.id}`, {
            method: "PATCH",
            body: profileData
        })
        if (profileRes.ok) {
            const profileResData = await profileRes.json();
            setProfileImage(null);
            setProfileUrl(null);
        }

        const bannerRes = await csrfFetch(`/api/users/${sessionUser.id}`, {
            method: "PATCH",
            body: bannerData
        })
        if (bannerRes.ok) {
            const bannerResData = await profileRes.json();
            setBannerImage(null);
            setProfileUrl(null);
        }
        history.push(`/users/${sessionUser.id}`);
    }

```

<br>

**Audio Navbar**

<br>

- Uploaded audio files are able to be played via the Audio Bar on the bottom of the page. Users are able to utilize all of the common audio streaming functionality including, play next/previous track, repeat track, shuffle tracks, as well as queue up tracks in a playlist.
<br>

![image](https://user-images.githubusercontent.com/103459101/213255948-dca8f8b3-6337-43b5-aa36-2dfed9351881.png)

<br>

- The Audio navbar works with the implementation of several React hooks working together. The Audio element is referenced and manipulated via the useRef hook, the audio file URL is saved in an array using the State hook, and the audio progress bar implementaion consists of the State hook to track audio's current time in conjunction with the requestAnimationFrame method that updates a slider element to emulate current track progress.

<br>

```javascript

onst handlePlay = (e) => {
        const prevState = isPlaying;

        playPause === playUrl ? setPlayPause(pauseUrl) : setPlayPause(playUrl);

        setIsPlaying(!prevState);

        if (!prevState) {
            if(!trackNum) setTrackNum(0);
            audioPlayer.current.play();
            sliderRef.current = requestAnimationFrame(whilePlay);
        } else {
            audioPlayer.current.pause();
            cancelAnimationFrame(sliderRef.current);
        }
    }
    
    const whilePlay = () => {
        progressBar.current.value = audioPlayer.current.currentTime;
        progressBar.current.style.setProperty('--bar-before', `${progressBar.current.value / duration * 100}%`)
        setCurrentTime(progressBar.current.value);
        sliderRef.current = requestAnimationFrame(whilePlay);
    }

    const handleNext = (e) => {
        if (trackNum >= trackList.length-1 ) {
            setTrackNum(0);
        } else {
            setTrackNum(trackNum + 1);
        }
    }

    const handlePrev = (e) => {
        e.preventDefault();
        if (trackNum <= 0) {
            setTrackNum(4);
        } else {
            setTrackNum(trackNum-1);
        }
    }


```

<br>

**Search Functionality**

![image](https://user-images.githubusercontent.com/103459101/213256877-ccc46d1a-33e8-4fb2-91bd-21cefd9b548f.png)

- Users are able to search up other usernames or track titles. Search bar will link to the user's profile page where you can browse the searched user's tracks and track comments.

<br>

**Technologies, Libraries, and APIs**

- React Javascript Library
- Ruby on Rails backend
- Amazon S3 Cloud Storage
- Heroku Cloud Hosting

<br>


**Future Features**

- Track Show page with Audio waveform and time-marked comments.
- ~~Search bar functionality for users and audio files.~~
- ~~User follows and track likes.~~
- ~~Adding specific track to audio navbar play-list.~~
