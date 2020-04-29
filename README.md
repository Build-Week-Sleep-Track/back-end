# back-end

### AUTH

################

## REGISTER: \\\$\$

email(string): required,
password(string): required,
first_name(string): required,
last_name(string): required,

### POST(https://sleep-tracker2020.herokuapp.com/api/auth/register, registerInfo)

returns 400 if required fields are missing

## LOGIN

email(string): required,
password(string): required,

### POST (https://sleep-tracker2020.herokuapp.com/api/auth/login, userCreds)

if successful, resolves to 200, returning a token as well as info about the user.

#################################

## USER_INFO ### AUTHORIZATION TOKEN REQUIRED IN HEADER FOR THESE ROUTES!!!!!!

## ID FOR USER IS NOT NECCESSARY, THIS IS BEING HANDLED BY THE TOKEN ON THE BACKEND.

################################

## GET (https://sleep-tracker2020.herokuapp.com/api/users/)

resolves to an array all of users sleep sessions

## POST {https://sleep-tracker2020.herokuapp.com/api/users/}

sleep_start(date) : required (format yyyy-mm-ddd hh:mm:ss)
start_score(integer): required (0-4),
sleep_end(date): required (format yyyy-mm-dd hh:mm:ss)
end_score(integer): required(0-4)
overall_score(integer): required(0-4)

adds a sleep_session to users_sleep_sessions

## DELETE {https://sleep-tracker2020.herokuapp.com/api/users/:post_id (sleep session id)}

requires the post_id or sleep session id.

## PUT (https://sleep-tracker2020.herokuapp.com/api/users/:post_id, updatedInfo)

updates a users sleep session info. Requires the updated info to be sent in the request body.

## GET (https://sleep-tracker2020.herokuapp.com/users/:id/dates?start=START_DATE&end=END_DATE)

requires a start and end date, which are added as dynamic variables (START_DATE, END_DATE) to query string (start, end)

resolves to sleep_sessions for week starting and ending with START_DATE END_DATE, respectively.
