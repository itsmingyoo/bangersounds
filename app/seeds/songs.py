from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from app.models import Song


# Adds a demo user, you can add other users here if you want
def seed_songs():
    # 41 Seed Data
    songs = [
        {
            "title": "CARTMAN - Mix Tape",
            "genre": "Hip-Hop & RAP",
            "song_url": "https://soundbangersbucket.s3.us-west-1.amazonaws.com/cartman-god-tier-rapper.mp3",
            "description": "ERIC CARTMAN RAP GOD CHANGING THE RAP SCENE. From his foul-mouthed humor to his cunning wordplay, Cartman's spitting fire in a brand new way. With beats that bang and rhymes that stun, He's the top dog in the rap game, second to none.",
            "private": False,
            "caption": "RAP GOD HOMIE REPRESENT FROM SOUTH PARK",
            "artistId": 12,
            "thumbnail": "https://cdn.discordapp.com/attachments/1108904522220318781/1142128184867946576/cartman.JPG"
        },
        {
            "title": "Adventure Club x Said the Sky - Already Know (Feat. Caly Bevier)",
            "genre": "Dance & EDM",
            "song_url": "https://soundbangersbucket.s3.us-west-1.amazonaws.com/songs-to-seed/Adventure+Club+x+Said+the+Sky+-+Already+Know+(Feat.+Caly+Bevier).mp3",
            "description": "Default Description From BangerSounds",
            "private": False,
            "caption": "Bangers All Around",
            "artistId": 1,
            "thumbnail": "https://soundbangersimagesbucket.s3.us-west-1.amazonaws.com/thumbnails-to-seed/1.jpg"
        },
        {
            "title": "Alina Baraz - Paradise (Prod. By esta)",
            "genre": "R&B & Soul",
            "song_url": "https://soundbangersbucket.s3.us-west-1.amazonaws.com/songs-to-seed/Alina+Baraz+-+Paradise+(Prod.+By+esta).mp3",
            "description": "Default Description From BangerSounds",
            "private": False,
            "caption": "Bangers All Around",
            "artistId": 2,
            "thumbnail": "https://soundbangersimagesbucket.s3.us-west-1.amazonaws.com/thumbnails-to-seed/11.jpg"
        },
        {
            "title": "$uicideboy$ - Unlucky Me",
            "genre": "Hip-Hop & RAP",
            "song_url": "https://soundbangersbucket.s3.us-west-1.amazonaws.com/songs-to-seed/%24uicideboy%24+-+UNLUCKY+ME.mp3",
            "description": "Default Description From BangerSounds",
            "private": False,
            "caption": "Bangers All Around",
            "artistId": 3,
            "thumbnail": "https://soundbangersimagesbucket.s3.us-west-1.amazonaws.com/thumbnails-to-seed/33+-+unlucky+me+suicide+boys.jpg"
        },
        {
            "title": "Alison Wonderland - Church (Hex Cougar Remix)",
            "genre": "Dance & EDM",
            "song_url": "https://soundbangersbucket.s3.us-west-1.amazonaws.com/songs-to-seed/Alison+Wonderland+-+Church+(Hex+Cougar+Remix).mp3",
            "description": "Default Description From BangerSounds",
            "private": False,
            "caption": "Bangers All Around",
            "artistId": 4,
            "thumbnail": "https://soundbangersimagesbucket.s3.us-west-1.amazonaws.com/thumbnails-to-seed/15.jpg"
        },
        {
            "title": "benny mayne - say my name",
            "genre": "R&B & Soul",
            "song_url": "https://soundbangersbucket.s3.us-west-1.amazonaws.com/songs-to-seed/benny+mayne+-+say+my+name.mp3",
            "description": "Default Description From BangerSounds",
            "private": False,
            "caption": "Bangers All Around",
            "artistId": 5,
            "thumbnail": "https://soundbangersimagesbucket.s3.us-west-1.amazonaws.com/thumbnails-to-seed/4.jpg"
        },
        {
            "title": "$uicideboy$ - Kill Yourself (Part III)",
            "genre": "Hip-hop & Rap",
            "song_url": "https://soundbangersbucket.s3.us-west-1.amazonaws.com/songs-to-seed/%24uicideboy%24+-+Kill+Yourself+(Part+III).mp3",
            "description": "Default Description From BangerSounds",
            "private": False,
            "caption": "Bangers All Around",
            "artistId": 3,
            "thumbnail": "https://soundbangersimagesbucket.s3.us-west-1.amazonaws.com/thumbnails-to-seed/33+-+unlucky+me+suicide+boys.jpg"
        },
        {
            "title": "billie eilish - ocean eyes (blackbear remix)",
            "genre": "R&B & Soul",
            "song_url": "https://soundbangersbucket.s3.us-west-1.amazonaws.com/songs-to-seed/billie+eilish+-+ocean+eyes+(blackbear+remix).mp3",
            "description": "Default Description From BangerSounds",
            "private": False,
            "caption": "Bangers All Around",
            "artistId": 7,
            "thumbnail": "https://soundbangersimagesbucket.s3.us-west-1.amazonaws.com/thumbnails-to-seed/23+-+lost.jpg"
        },
        {
            "title": "Chicane vs Natasha Bedingfield - Bruised Water (Adam K & Soha Club Mix)",
            "genre": "Trance",
            "song_url": "https://soundbangersbucket.s3.us-west-1.amazonaws.com/songs-to-seed/Chicane+vs+Natasha+Bedingfield+-+Bruised+Water+(Adam+K+%26+Soha+Club+Mix).mp3",
            "description": "Default Description From BangerSounds",
            "private": False,
            "caption": "Bangers All Around",
            "artistId": 8,
            "thumbnail": "https://soundbangersimagesbucket.s3.us-west-1.amazonaws.com/thumbnails-to-seed/23+-+lost.jpg"
        },
        {
            "title": "CRVE U - A$AP Rocky Ft. Skepta - Praise The Lord (CRVE U & SKUM Remix)",
            "genre": "Dance & EDM",
            "song_url": "https://soundbangersbucket.s3.us-west-1.amazonaws.com/songs-to-seed/CRVE+U+-+A%24AP+Rocky+Ft.+Skepta+%E2%80%93+Praise+The+Lord+(CRVE+U+%26+SKUM+Remix).mp3",
            "description": "Default Description From BangerSounds",
            "private": False,
            "caption": "Bangers All Around",
            "artistId": 9,
            "thumbnail": "https://soundbangersimagesbucket.s3.us-west-1.amazonaws.com/thumbnails-to-seed/16.jpg"
        },
        {
            "title": "CRVE U - Lil Xan - Xanarchy (CRVE U Remix)",
            "genre": "Dance & EDM",
            "song_url": "https://soundbangersbucket.s3.us-west-1.amazonaws.com/songs-to-seed/CRVE+U+-+Lil+Xan+-+Xanarchy+(CRVE+U+Remix).mp3",
            "description": "Default Description From BangerSounds",
            "private": False,
            "caption": "Bangers All Around",
            "artistId": 1,
            "thumbnail": "https://soundbangersimagesbucket.s3.us-west-1.amazonaws.com/thumbnails-to-seed/23+-+lost.jpg"
        },
        {
            "title": "CRVE U - Please Don't Go",
            "genre": "Dance & EDM",
            "song_url": "https://soundbangersbucket.s3.us-west-1.amazonaws.com/songs-to-seed/CRVE+U+-+Please+Don't+Go.mp3",
            "description": "Default Description From BangerSounds",
            "private": False,
            "caption": "Bangers All Around",
            "artistId": 4,
            "thumbnail": "https://soundbangersimagesbucket.s3.us-west-1.amazonaws.com/thumbnails-to-seed/18.jpg"
        },
        {
            "title": "Fragma - Toca's Miracle (In Petto 2008 Remix)",
            "genre": "Trance",
            "song_url": "https://soundbangersbucket.s3.us-west-1.amazonaws.com/songs-to-seed/Fragma+-+Toca's+Miracle+(In+Petto+2008+Remix).mp3",
            "description": "Default Description From BangerSounds",
            "private": False,
            "caption": "Bangers All Around",
            "artistId": 5,
            "thumbnail": "https://soundbangersimagesbucket.s3.us-west-1.amazonaws.com/thumbnails-to-seed/19.jpg"
        },
        {
            "title": "Gallant - Gentleman (feat. T-Pain) [Remix]",
            "genre": "R&B & Soul",
            "song_url": "https://soundbangersbucket.s3.us-west-1.amazonaws.com/songs-to-seed/Gallant+-+Gentleman+(feat.+T-Pain)+%5BRemix%5D.mp3",
            "description": "Default Description From BangerSounds",
            "private": False,
            "caption": "Bangers All Around",
            "artistId": 5,
            "thumbnail": "https://soundbangersimagesbucket.s3.us-west-1.amazonaws.com/thumbnails-to-seed/29+-+zephure+gallant.jpg"
        },
        {
            "title": "GUDFELLA - Say My Name (GUDFELLA Remix)",
            "genre": "",
            "song_url": "https://soundbangersbucket.s3.us-west-1.amazonaws.com/songs-to-seed/GUDFELLA+-+Say+My+Name+(GUDFELLA+Remix).mp3",
            "description": "Default Description From BangerSounds",
            "private": False,
            "caption": "Bangers All Around",
            "artistId": 6,
            "thumbnail": "https://soundbangersimagesbucket.s3.us-west-1.amazonaws.com/thumbnails-to-seed/3.jpg"
        },
        {
            "title": "Hex Cougar - Afterlife (feat. Jarell Perry)",
            "genre": "Trap",
            "song_url": "https://soundbangersbucket.s3.us-west-1.amazonaws.com/songs-to-seed/Hex+Cougar+-+Afterlife+(feat.+Jarell+Perry).mp3",
            "description": "Default Description From BangerSounds",
            "private": False,
            "caption": "Bangers All Around",
            "artistId": 5,
            "thumbnail": "https://soundbangersimagesbucket.s3.us-west-1.amazonaws.com/thumbnails-to-seed/31.jpg"
        },
        {
            "title": "Hex Cougar - anythingUwant",
            "genre": "Trap",
            "song_url": "https://soundbangersbucket.s3.us-west-1.amazonaws.com/songs-to-seed/Hex+Cougar+-+anythingUwant.mp3",
            "description": "Default Description From BangerSounds",
            "private": False,
            "caption": "Bangers All Around",
            "artistId": 5,
            "thumbnail": "https://soundbangersimagesbucket.s3.us-west-1.amazonaws.com/thumbnails-to-seed/32.jpg"
        },
        {
            "title": "Hex Cougar - How Does It Feel",
            "genre": "Trap",
            "song_url": "https://soundbangersbucket.s3.us-west-1.amazonaws.com/songs-to-seed/Hex+Cougar+-+How+Does+It+Feel.mp3",
            "description": "Default Description From BangerSounds",
            "private": False,
            "caption": "Bangers All Around",
            "artistId": 5,
            "thumbnail": "https://soundbangersimagesbucket.s3.us-west-1.amazonaws.com/thumbnails-to-seed/30.jpg"
        },
        {
            "title": "illenium - blanke - all together - hollow - gorgeous (extended edit)",
            "genre": "Dance & EDM",
            "song_url": "https://soundbangersbucket.s3.us-west-1.amazonaws.com/songs-to-seed/illenium+-+blanke+-+all+together+-+hollow+-+gorgeous+(extended+edit).mp3",
            "description": "Default Description From BangerSounds",
            "private": False,
            "caption": "Bangers All Around",
            "artistId": 1,
            "thumbnail": "https://soundbangersimagesbucket.s3.us-west-1.amazonaws.com/thumbnails-to-seed/5+-+illenium.jpg"
        },
        {
            "title": "Jai Wolf - Lost ft. Chelsea Jade (Foxen Remix)",
            "genre": "Dance & EDM",
            "song_url": "https://soundbangersbucket.s3.us-west-1.amazonaws.com/songs-to-seed/Jai+Wolf+-+Lost+ft.+Chelsea+Jade+(Foxen+Remix).mp3",
            "description": "Default Description From BangerSounds",
            "private": False,
            "caption": "Bangers All Around",
            "artistId": 5,
            "thumbnail": "https://soundbangersimagesbucket.s3.us-west-1.amazonaws.com/thumbnails-to-seed/20.jpg"
        },
        {
            "title": "juice wrld - lucid dreams (xo sad cover)",
            "genre": "Hip-hop & Rap",
            "song_url": "https://soundbangersbucket.s3.us-west-1.amazonaws.com/songs-to-seed/juice+wrld+-+lucid+dreams+(xo+sad+cover).mp3",
            "description": "Default Description From BangerSounds",
            "private": False,
            "caption": "Bangers All Around",
            "artistId": 5,
            "thumbnail": "https://soundbangersimagesbucket.s3.us-west-1.amazonaws.com/thumbnails-to-seed/20.jpg"
        },
        {
            "title": "Kaskade & Deadmau5 - Move For Me (AVE & EFX x Varun Remix)",
            "genre": "Electronic",
            "song_url": "https://soundbangersbucket.s3.us-west-1.amazonaws.com/songs-to-seed/Kaskade+%26+Deadmau5+-+Move+For+Me+(AVE+%26+EFX+x+Varun+Remix).mp3",
            "description": "Default Description From BangerSounds",
            "private": False,
            "caption": "Bangers All Around",
            "artistId": 7,
            "thumbnail": "https://soundbangersimagesbucket.s3.us-west-1.amazonaws.com/thumbnails-to-seed/9+-+Kaskade+Deadmau5.jpg"
        },
        {
            "title": "keshi - drunk",
            "genre": "R&B & Soul",
            "song_url": "https://soundbangersbucket.s3.us-west-1.amazonaws.com/songs-to-seed/keshi+-+drunk+(Audio).mp3",
            "description": "Default Description From BangerSounds",
            "private": False,
            "caption": "Bangers All Around",
            "artistId": 5,
            "thumbnail": "https://soundbangersimagesbucket.s3.us-west-1.amazonaws.com/thumbnails-to-seed/13+-+keshi.jpg"
        },
        {
            "title": "keshi - 2 soon",
            "genre": "R&B & Soul",
            "song_url": "https://soundbangersbucket.s3.us-west-1.amazonaws.com/songs-to-seed/keshi+-+2+soon.mp3",
            "description": "Default Description From BangerSounds",
            "private": False,
            "caption": "Bangers All Around",
            "artistId": 2,
            "thumbnail": "https://soundbangersimagesbucket.s3.us-west-1.amazonaws.com/thumbnails-to-seed/13+-+keshi.jpg"
        },
        {
            "title": "keshi - alright",
            "genre": "R&B & Soul",
            "song_url": "https://soundbangersbucket.s3.us-west-1.amazonaws.com/songs-to-seed/keshi+-+alright.mp3",
            "description": "Default Description From BangerSounds",
            "private": False,
            "caption": "Bangers All Around",
            "artistId": 8,
            "thumbnail": "https://soundbangersimagesbucket.s3.us-west-1.amazonaws.com/thumbnails-to-seed/13+-+keshi.jpg"
        },
        {
            "title": "keshi - less of you",
            "genre": "R&B & Soul",
            "song_url": "https://soundbangersbucket.s3.us-west-1.amazonaws.com/songs-to-seed/keshi+-+less+of+you+(Audio).mp3",
            "description": "Default Description From BangerSounds",
            "private": False,
            "caption": "Bangers All Around",
            "artistId": 9,
            "thumbnail": "https://soundbangersimagesbucket.s3.us-west-1.amazonaws.com/thumbnails-to-seed/13+-+keshi.jpg"
        },
        {
            "title": "keshi - skeletons",
            "genre": "R&B & Soul",
            "song_url": "https://soundbangersbucket.s3.us-west-1.amazonaws.com/songs-to-seed/keshi+-+skeletons.mp3",
            "description": "Default Description From BangerSounds",
            "private": False,
            "caption": "Bangers All Around",
            "artistId": 8,
            "thumbnail": "https://soundbangersimagesbucket.s3.us-west-1.amazonaws.com/thumbnails-to-seed/13+-+keshi.jpg"
        },
        {
            "title": "keshi - somebody",
            "genre": "R&B & Soul",
            "song_url": "https://soundbangersbucket.s3.us-west-1.amazonaws.com/songs-to-seed/keshi+-+somebody.mp3",
            "description": "Default Description From BangerSounds",
            "private": False,
            "caption": "Bangers All Around",
            "artistId": 10,
            "thumbnail": "https://soundbangersimagesbucket.s3.us-west-1.amazonaws.com/thumbnails-to-seed/13+-+keshi.jpg"
        },
        {
            "title": "keshi - xoxosos",
            "genre": "R&B & Soul",
            "song_url": "https://soundbangersbucket.s3.us-west-1.amazonaws.com/songs-to-seed/keshi+-+xoxosos.mp3",
            "description": "Default Description From BangerSounds",
            "private": False,
            "caption": "Bangers All Around",
            "artistId": 8,
            "thumbnail": "https://soundbangersimagesbucket.s3.us-west-1.amazonaws.com/thumbnails-to-seed/13+-+keshi.jpg"
        },
        {
            "title": "LUCA LUSH - ALL GIRLS ARE THE SAME FT. KID TRAVIS",
            "genre": "Hip-hop & Rap",
            "song_url": "https://soundbangersbucket.s3.us-west-1.amazonaws.com/songs-to-seed/LUCA+LUSH+-+ALL+GIRLS+ARE+THE+SAME+FT.+KID+TRAVIS.mp3",
            "description": "Default Description From BangerSounds",
            "private": False,
            "caption": "Bangers All Around",
            "artistId": 7,
            "thumbnail": "https://soundbangersimagesbucket.s3.us-west-1.amazonaws.com/thumbnails-to-seed/27.jpg"
        },
        {
            "title": "Luminary - Amsterdam (Super8 & Tab Remix)",
            "genre": "Trance",
            "song_url": "https://soundbangersbucket.s3.us-west-1.amazonaws.com/songs-to-seed/Luminary+-+Amsterdam+(Super8+%26+Tab+Remix).mp3",
            "description": "Default Description From BangerSounds",
            "private": False,
            "caption": "Bangers All Around",
            "artistId": 4,
            "thumbnail": "https://soundbangersimagesbucket.s3.us-west-1.amazonaws.com/thumbnails-to-seed/26.jpg"
        },
        {
            "title": "M'Black - Heartbreak (Bare Noize Remix)",
            "genre": "Dubstep",
            "song_url": "https://soundbangersbucket.s3.us-west-1.amazonaws.com/songs-to-seed/M'Black+-+Heartbreak+(Bare+Noize+Remix).mp3",
            "description": "Default Description From BangerSounds",
            "private": False,
            "caption": "Bangers All Around",
            "artistId": 7,
            "thumbnail": "https://soundbangersimagesbucket.s3.us-west-1.amazonaws.com/thumbnails-to-seed/24.jpg"
        },
        {
            "title": "Maazel - Fire",
            "genre": "R&B & Soul",
            "song_url": "https://soundbangersbucket.s3.us-west-1.amazonaws.com/songs-to-seed/Maazel+-+Fire.mp3",
            "description": "Default Description From BangerSounds",
            "private": False,
            "caption": "Bangers All Around",
            "artistId": 8,
            "thumbnail": "https://soundbangersimagesbucket.s3.us-west-1.amazonaws.com/thumbnails-to-seed/8+-+Maazel.jpg"
        },
        {
            "title": "marshmello - Here With Me (ft. CHVRCHES)",
            "genre": "Dance & EDM",
            "song_url": "https://soundbangersbucket.s3.us-west-1.amazonaws.com/songs-to-seed/marshmello+-+Here+With+Me+(ft.+CHVRCHES).mp3",
            "description": "Default Description From BangerSounds",
            "private": False,
            "caption": "Bangers All Around",
            "artistId": 3,
            "thumbnail": "https://soundbangersimagesbucket.s3.us-west-1.amazonaws.com/thumbnails-to-seed/6+-+marshmellow+churches.jpg"
        },
        {
            "title": "Massive Attack - Paradise Circus (Zeds Dead Remix)",
            "genre": "Dubstep",
            "song_url": "https://soundbangersbucket.s3.us-west-1.amazonaws.com/songs-to-seed/Massive+Attack+-+Paradise+Circus+(Zeds+Dead+Remix).mp3",
            "description": "Default Description From BangerSounds",
            "private": False,
            "caption": "Bangers All Around",
            "artistId": 2,
            "thumbnail": "https://soundbangersimagesbucket.s3.us-west-1.amazonaws.com/thumbnails-to-seed/21.jpg"
        },
        {
            "title": "Motorcycle - As The Rush Comes (Gabriel & Dresden Chillout Mix Radio Edit)",
            "genre": "Dubstep",
            "song_url": "https://soundbangersbucket.s3.us-west-1.amazonaws.com/songs-to-seed/Motorcycle+-+As+The+Rush+Comes+(Gabriel+%26+Dresden+Chillout+Mix+Radio+Edit).mp3",
            "description": "Default Description From BangerSounds",
            "private": False,
            "caption": "Bangers All Around",
            "artistId": 5,
            "thumbnail": "https://soundbangersimagesbucket.s3.us-west-1.amazonaws.com/thumbnails-to-seed/23+-+lost.jpg"
        },
        {
            "title": "Post Malone - i fall apart (xo sad cover)",
            "genre": "R&B & Soul",
            "song_url": "https://soundbangersbucket.s3.us-west-1.amazonaws.com/songs-to-seed/Post+Malone+-+i+fall+apart+(xo+sad+cover).mp3",
            "description": "Default Description From BangerSounds",
            "private": False,
            "caption": "Bangers All Around",
            "artistId": 10,
            "thumbnail": "https://soundbangersimagesbucket.s3.us-west-1.amazonaws.com/thumbnails-to-seed/25+-+lucid+dreams+juice+wrld.jpg"
        },
        {
            "title": "RL Grime X Utada Hikaru - Simple And Clean X I Wanna Know (Flipboitamidles Mashup)",
            "genre": "Trap",
            "song_url": "https://soundbangersbucket.s3.us-west-1.amazonaws.com/songs-to-seed/RL+Grime+X+Utada+Hikaru+-+Simple+And+Clean+X+I+Wanna+Know+(Flipboitamidles+Mashup).mp3",
            "description": "Default Description From BangerSounds",
            "private": False,
            "caption": "Bangers All Around",
            "artistId": 7,
            "thumbnail": "https://soundbangersimagesbucket.s3.us-west-1.amazonaws.com/thumbnails-to-seed/2+-+rl+grime+hikaru.jpg"
        },
        {
            "title": "Shotgun Radio - A Bad Place feat. Mimi Page (Minnesota Remix)",
            "genre": "Dubstep",
            "song_url": "https://soundbangersbucket.s3.us-west-1.amazonaws.com/songs-to-seed/Shotgun+Radio+-+A+Bad+Place+feat.+Mimi+Page+(Minnesota+Remix).mp3",
            "description": "Default Description From BangerSounds",
            "private": False,
            "caption": "Bangers All Around",
            "artistId": 5,
            "thumbnail": "https://soundbangersimagesbucket.s3.us-west-1.amazonaws.com/thumbnails-to-seed/23+-+lost.jpg"
        },
        {
            "title": "stwo - Haunted (ft. Sevdaliza)",
            "genre": "R&B & Soul",
            "song_url": "https://soundbangersbucket.s3.us-west-1.amazonaws.com/songs-to-seed/stwo+-+Haunted+(ft.+Sevdaliza).mp3",
            "description": "Default Description From BangerSounds",
            "private": False,
            "caption": "Bangers All Around",
            "artistId": 1,
            "thumbnail": "https://soundbangersimagesbucket.s3.us-west-1.amazonaws.com/thumbnails-to-seed/10+-+Destinys+Child+Say+my+name.jpg"
        },
        {
            "title": "Whethan - So Good (feat. bülow)",
            "genre": "Hip-hop & Rap",
            "song_url": "https://soundbangersbucket.s3.us-west-1.amazonaws.com/songs-to-seed/Whethan+-+So+Good+(feat.+b%C3%BClow).mp3",
            "description": "Default Description From BangerSounds",
            "private": False,
            "caption": "Bangers All Around",
            "artistId": 4,
            "thumbnail": "https://soundbangersimagesbucket.s3.us-west-1.amazonaws.com/thumbnails-to-seed/28+-+blackbear+ocean+eyes.jpg"
        },
        {
            "title": "Zephure - Gallant - Open Up (Zephure Remix)",
            "genre": "Dancehall",
            "song_url": "https://soundbangersbucket.s3.us-west-1.amazonaws.com/songs-to-seed/Zephure+-+Gallant+-+Open+Up+(Zephure+Remix).mp3",
            "description": "Default Description From BangerSounds",
            "private": False,
            "caption": "Bangers All Around",
            "artistId": 3,
            "thumbnail": "https://soundbangersimagesbucket.s3.us-west-1.amazonaws.com/thumbnails-to-seed/14+-+crve+u.jpg"
        },
        {
            "title": "Alan Walker & Sasha Alex Sloan - Hero",
            "genre": "Dance & EDM",
            "song_url": "https://soundbangersbucket.s3.us-west-1.amazonaws.com/Alan+Walker+%26+Sasha+Alex+Sloan+-+Hero.mp3",
            "description": "Default Description From BangerSounds",
            "private": False,
            "caption": "Bangers All Around",
            "artistId": 7,
            "thumbnail": "https://soundbangersimagesbucket.s3.us-west-1.amazonaws.com/thumbnails-to-seed/23+-+lost.jpg"
        },
        {
            "title": "keshi - always",
            "genre": "Alternative",
            "song_url": "https://soundbangersbucket.s3.us-west-1.amazonaws.com/keshi+-+always.mp3",
            "description": "Default Description From BangerSounds",
            "private": False,
            "caption": "Bangers All Around",
            "artistId": 7,
            "thumbnail": "https://soundbangersimagesbucket.s3.us-west-1.amazonaws.com/thumbnails-to-seed/13+-+keshi.jpg"
        },
        {
            "title": "Sarude - Dandstorm",
            "genre": "Dancehall",
            "song_url": "https://soundbangersbucket.s3.us-west-1.amazonaws.com/Sarude+-+Dandstorm.mp3",
            "description": "Default Description From BangerSounds",
            "private": False,
            "caption": "Bangers All Around",
            "artistId": 11,
            "thumbnail": "https://mixmag.net/assets/uploads/images/_full/darudesandstorm.jpg"
        },
        {
            "title": "1nonly - Bunny Girl",
            "genre": "Hip-Hop & Rap",
            "song_url": "https://soundbangersbucket.s3.us-west-1.amazonaws.com/seed-data-pt2/1nonly+-+Bunny+Girl.mp3",
            "description": "Default Description From BangerSounds",
            "private": False,
            "caption": "Bangers All Around",
            "artistId": 15,
            "thumbnail": "https://soundbangersimagesbucket.s3.us-west-1.amazonaws.com/seed-data-pt2/1nonly-bunnygirl.jpg"
        },
        {
            "title": "Young Thug, 6LACK - Climax",
            "genre": "Hip-Hop & Rap",
            "song_url": "https://soundbangersbucket.s3.us-west-1.amazonaws.com/seed-data-pt2/Young+Thug%2C+6LACK+-+Climax+(feat.+6lack).mp3",
            "description": "Default Description From BangerSounds",
            "private": False,
            "caption": "Bangers All Around",
            "artistId": 9,
            "thumbnail": "https://soundbangersimagesbucket.s3.us-west-1.amazonaws.com/seed-data-pt2/6lack-climax.jpg"
        },
        {
            "title": "A Day To Remember - If It Means a Lot to You",
            "genre": "Alternative Rock",
            "song_url": "https://soundbangersbucket.s3.us-west-1.amazonaws.com/seed-data-pt2/A+Day+To+Remember+-+If+It+Means+a+Lot+to+You.mp3",
            "description": "Default Description From BangerSounds",
            "private": False,
            "caption": "Bangers All Around",
            "artistId": 22,
            "thumbnail": "https://soundbangersimagesbucket.s3.us-west-1.amazonaws.com/seed-data-pt2/a-day-to-remember-if-it-means-alot-to-you.jpg"
        },
        {
            "title": "Astrus - She wonders why",
            "genre": "Hip-Hop & Rap",
            "song_url": "https://soundbangersbucket.s3.us-west-1.amazonaws.com/seed-data-pt2/Astrus+-+She+Wonders+Why.mp3",
            "description": "Default Description From BangerSounds",
            "private": False,
            "caption": "Bangers All Around",
            "artistId": 5,
            "thumbnail": "https://soundbangersimagesbucket.s3.us-west-1.amazonaws.com/seed-data-pt2/astrus-she-wonders-why.jpg"
        },
        {
            "title": "Dance Gavin Dance - Evaporate",
            "genre": "Rock",
            "song_url": "https://soundbangersbucket.s3.us-west-1.amazonaws.com/seed-data-pt2/Dance+Gavin+Dance+-+Evaporate.mp3",
            "description": "Default Description From BangerSounds",
            "private": False,
            "caption": "Bangers All Around",
            "artistId": 11,
            "thumbnail": "https://soundbangersimagesbucket.s3.us-west-1.amazonaws.com/seed-data-pt2/dance-gavin-dance.jpg"
        },
        {
            "title": "",
            "genre": "",
            "song_url": "",
            "description": "Default Description From BangerSounds",
            "private": False,
            "caption": "Bangers All Around",
            "artistId": ,
            "thumbnail": ""
        },
        {
            "title": "",
            "genre": "",
            "song_url": "",
            "description": "Default Description From BangerSounds",
            "private": False,
            "caption": "Bangers All Around",
            "artistId": ,
            "thumbnail": ""
        },
        {
            "title": "",
            "genre": "",
            "song_url": "",
            "description": "Default Description From BangerSounds",
            "private": False,
            "caption": "Bangers All Around",
            "artistId": ,
            "thumbnail": ""
        },
        {
            "title": "",
            "genre": "",
            "song_url": "",
            "description": "Default Description From BangerSounds",
            "private": False,
            "caption": "Bangers All Around",
            "artistId": ,
            "thumbnail": ""
        },
        {
            "title": "",
            "genre": "",
            "song_url": "",
            "description": "Default Description From BangerSounds",
            "private": False,
            "caption": "Bangers All Around",
            "artistId": ,
            "thumbnail": ""
        },
        {
            "title": "",
            "genre": "",
            "song_url": "",
            "description": "Default Description From BangerSounds",
            "private": False,
            "caption": "Bangers All Around",
            "artistId": ,
            "thumbnail": ""
        },
        {
            "title": "",
            "genre": "",
            "song_url": "",
            "description": "Default Description From BangerSounds",
            "private": False,
            "caption": "Bangers All Around",
            "artistId": ,
            "thumbnail": ""
        },
        {
            "title": "",
            "genre": "",
            "song_url": "",
            "description": "Default Description From BangerSounds",
            "private": False,
            "caption": "Bangers All Around",
            "artistId": ,
            "thumbnail": ""
        },
        {
            "title": "",
            "genre": "",
            "song_url": "",
            "description": "Default Description From BangerSounds",
            "private": False,
            "caption": "Bangers All Around",
            "artistId": ,
            "thumbnail": ""
        },
        {
            "title": "",
            "genre": "",
            "song_url": "",
            "description": "Default Description From BangerSounds",
            "private": False,
            "caption": "Bangers All Around",
            "artistId": ,
            "thumbnail": ""
        },

    ]


    for song in songs:
        each_song = Song(**song)
        print(each_song)
        db.session.add(each_song)
        db.session.commit()
    return songs


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM songs"))

    db.session.commit()
