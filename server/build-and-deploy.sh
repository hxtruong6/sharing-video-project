#! /bin/bash

export PROJECT_ID=remini-video-sharing
export REGION=asia-southeast1
export CONNECTION_NAME=remini-video-sharing:asia-southeast1:sharing-video

gcloud builds submit \
    --tag gcr.io/$PROJECT_ID/remi-server \
    --project $PROJECT_ID

gcloud run deploy poll \
    --image gcr.io/$PROJECT_ID/remi-server \
    --platform managed \
    --region $REGION \
    --allow-unauthenticated \
    --add-cloudsql-instances $CONNECTION_NAME \
    --project $PROJECT_ID
