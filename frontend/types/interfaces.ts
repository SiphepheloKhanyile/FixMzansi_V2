interface User {
    id:              number;
    username:        string;
    email:           string;
    first_name:      string;
    last_name:       string;
    user_type:       string;
    profile_picture: string | null;
    date_joined:     Date;
    accessToken:     string;
}

