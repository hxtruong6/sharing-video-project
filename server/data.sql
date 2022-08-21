--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: on_update_timestamp(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.on_update_timestamp() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    BEGIN
        NEW.updated_at = now();
        RETURN NEW;
    END;
    $$;


ALTER FUNCTION public.on_update_timestamp() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: knex_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.knex_migrations (
    id integer NOT NULL,
    name character varying(255),
    batch integer,
    migration_time timestamp with time zone
);


ALTER TABLE public.knex_migrations OWNER TO postgres;

--
-- Name: knex_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.knex_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.knex_migrations_id_seq OWNER TO postgres;

--
-- Name: knex_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.knex_migrations_id_seq OWNED BY public.knex_migrations.id;


--
-- Name: knex_migrations_lock; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.knex_migrations_lock (
    index integer NOT NULL,
    is_locked integer
);


ALTER TABLE public.knex_migrations_lock OWNER TO postgres;

--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.knex_migrations_lock_index_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.knex_migrations_lock_index_seq OWNER TO postgres;

--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.knex_migrations_lock_index_seq OWNED BY public.knex_migrations_lock.index;


--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    first_name character varying(255),
    full_name character varying(255),
    user_name character varying(255),
    password character varying(255) NOT NULL,
    is_actived boolean DEFAULT true NOT NULL,
    avatar character varying(255),
    playlist_url character varying(255),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone,
    last_login timestamp with time zone,
    deleted_by integer,
    deleted_at timestamp with time zone
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: user_log; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_log (
    id integer NOT NULL,
    user_id integer,
    last_token character varying(255),
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp with time zone
);


ALTER TABLE public.user_log OWNER TO postgres;

--
-- Name: user_log_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_log_id_seq OWNER TO postgres;

--
-- Name: user_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_log_id_seq OWNED BY public.user_log.id;


--
-- Name: video; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.video (
    id integer NOT NULL,
    name character varying(255),
    url character varying(255),
    description text,
    created_by integer,
    updated_by integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone,
    deleted_by integer,
    deleted_at timestamp with time zone
);


ALTER TABLE public.video OWNER TO postgres;

--
-- Name: video_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.video_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.video_id_seq OWNER TO postgres;

--
-- Name: video_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.video_id_seq OWNED BY public.video.id;


--
-- Name: video_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.video_user (
    id integer NOT NULL,
    user_id integer NOT NULL,
    video_id integer NOT NULL,
    is_public boolean DEFAULT true NOT NULL,
    "like" integer DEFAULT 0,
    created_by integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_by integer,
    updated_at timestamp with time zone,
    deleted_by integer,
    deleted_at timestamp with time zone
);


ALTER TABLE public.video_user OWNER TO postgres;

--
-- Name: video_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.video_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.video_user_id_seq OWNER TO postgres;

--
-- Name: video_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.video_user_id_seq OWNED BY public.video_user.id;


--
-- Name: knex_migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.knex_migrations ALTER COLUMN id SET DEFAULT nextval('public.knex_migrations_id_seq'::regclass);


--
-- Name: knex_migrations_lock index; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.knex_migrations_lock ALTER COLUMN index SET DEFAULT nextval('public.knex_migrations_lock_index_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Name: user_log id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_log ALTER COLUMN id SET DEFAULT nextval('public.user_log_id_seq'::regclass);


--
-- Name: video id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.video ALTER COLUMN id SET DEFAULT nextval('public.video_id_seq'::regclass);


--
-- Name: video_user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.video_user ALTER COLUMN id SET DEFAULT nextval('public.video_user_id_seq'::regclass);


--
-- Data for Name: knex_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.knex_migrations (id, name, batch, migration_time) FROM stdin;
2	20210305053424_updated_at__function.ts	1	2022-08-19 14:10:12.019+09
3	20210305053443_init_schema.ts	1	2022-08-19 14:10:12.047+09
\.


--
-- Data for Name: knex_migrations_lock; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.knex_migrations_lock (index, is_locked) FROM stdin;
1	0
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, first_name, full_name, user_name, password, is_actived, avatar, playlist_url, created_at, updated_at, last_login, deleted_by, deleted_at) FROM stdin;
2	\N	\N	admin	$2b$10$GzHrGgIPG4KqOi6r5jefGOKH13LRui3xvu0cyCl8zGV.T46S7JRBC	t	\N	admin	2022-08-20 01:13:30.259511+09	\N	\N	\N	\N
3	\N	\N	user01	$2b$10$kSGfPFnU.8kfk1SGApVkRuyP6.cxgrU9t/qgiEfOg82Bln6oBYvjW	t	\N	user01	2022-08-21 03:05:35.718165+09	\N	\N	\N	\N
4	\N	\N	user02	$2b$10$PV4bPiQkLdgAvVBQju29UOZ98Mf62sJEDq2C5fXa6hqCuwsmOegY6	t	\N	user02	2022-08-21 03:12:25.673345+09	\N	\N	\N	\N
5	\N	\N	user03	$2b$10$Y55QdB2pacW2ZvrRD3koDeWIDkSbHNSibf1YBCR1EFk/VDDYsM5Zi	t	\N	user03	2022-08-21 03:13:41.199886+09	\N	\N	\N	\N
6	\N	\N	user04	$2b$10$UVLaDA5O5nlBRLE/I7dmFudDLlJlPM.2TA2cfi8q8r3RMGYv6APIe	t	\N	user04	2022-08-21 03:21:25.58093+09	\N	\N	\N	\N
7	\N	\N	user05	$2b$10$HmoM.bgEmiTPiQT8CDpO4O6jxMJ8g4JXerwUMx8KEd0iKlea.siey	t	\N	user05	2022-08-21 03:21:57.058533+09	\N	\N	\N	\N
8	\N	\N	user06	$2b$10$iB6E59iNVWRoS7SOhWjzN.d.5VWEHy8H/noG/m9Ssa59pzxmtgxbW	t	\N	user06	2022-08-21 03:23:39.391429+09	\N	\N	\N	\N
9	\N	\N	user07	$2b$10$YnATBoV1y0MvxYuZsv0w5.jUroUwE.SFHPyNmdAUI2JYlZbPoIfMe	t	\N	user07	2022-08-21 03:24:33.89727+09	\N	\N	\N	\N
10	\N	\N	user08	$2b$10$3xXi1wyktkk/ZI6xaax23.dKEONSU9rdVOfYXBsQVYON4IYB7cbRi	t	\N	user08	2022-08-21 03:28:38.647333+09	\N	\N	\N	\N
11	\N	\N	vuser01	$2b$10$2uAL6C28Fk6gsALJXywn2u861hNkuzDzCxMTKB3Ox2wW0U4agpqnm	t	\N	vuser01	2022-08-21 04:02:25.965435+09	\N	\N	\N	\N
12	\N	\N	vuser02	$2b$10$XjZRSkhLboaDjd91A//pfuPSimMCud7U/q3QZuGf3H1JSW8TahW7a	t	\N	vuser02	2022-08-21 04:05:51.791478+09	\N	\N	\N	\N
13	\N	\N	vuser03	$2b$10$Dcb58xG4IBthoV51Bx4XCuaIFS12s3yF0qIzUqqUwdFYp3tYxHchu	t	\N	vuser03	2022-08-21 18:48:39.596208+09	\N	\N	\N	\N
14	\N	\N	vuser04	$2b$10$JWbayJWJMnMtmf8AmtwtE.XMj/dBoKsEYe4.VptVaAF7M19jmbQ6u	t	\N	vuser04	2022-08-21 23:07:56.258309+09	\N	\N	\N	\N
15	\N	\N	vuser05	$2b$10$ZOhQkjEQ7JYA2kWnStzDBeFRRmSDsp1mJrDSXaHMNxD7X13tou/qS	t	\N	vuser05	2022-08-21 23:09:06.747256+09	\N	\N	\N	\N
\.


--
-- Data for Name: user_log; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_log (id, user_id, last_token, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: video; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.video (id, name, url, description, created_by, updated_by, created_at, updated_at, deleted_by, deleted_at) FROM stdin;
18	\N	https://www.youtube.com/watch?v=MiHKgpj-POE	Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.	12	\N	2022-08-21 18:46:13.479221+09	\N	\N	\N
19	\N	https://www.youtube.com/watch?v=h0k83YpI_Vs	Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.	12	\N	2022-08-21 18:48:09.415301+09	\N	\N	\N
20	\N	https://www.youtube.com/watch?v=uEdNhbMgYAs	Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.	12	\N	2022-08-21 18:48:24.737731+09	\N	\N	\N
21	\N	https://www.youtube.com/watch?v=LAyqUtwtmF0	Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.	13	\N	2022-08-21 18:49:28.659738+09	\N	\N	\N
22	\N	https://www.youtube.com/watch?v=TAJs_VpfopA	Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.	13	\N	2022-08-21 21:10:06.981644+09	\N	\N	\N
23	\N	https://www.youtube.com/watch?v=MnbO1gU368A	Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.	13	\N	2022-08-21 21:10:22.999993+09	\N	\N	\N
24	\N	https://www.youtube.com/watch?v=P56RouFPdLk	Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.	13	\N	2022-08-21 21:10:35.249915+09	\N	\N	\N
\.


--
-- Data for Name: video_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.video_user (id, user_id, video_id, is_public, "like", created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) FROM stdin;
23	13	22	t	0	13	2022-08-21 21:10:06.987601+09	\N	\N	\N	\N
20	12	20	t	-1	12	2022-08-21 18:48:24.744543+09	\N	2022-08-21 23:08:56.189621+09	\N	\N
27	15	20	t	1	15	2022-08-21 23:09:14.755525+09	\N	2022-08-21 23:09:21.202135+09	\N	\N
24	13	23	t	1	13	2022-08-21 21:10:23.006925+09	13	2022-08-21 23:50:06.796492+09	\N	\N
25	13	24	t	-1	13	2022-08-21 21:10:35.256938+09	13	2022-08-21 23:50:44.085904+09	\N	\N
26	14	20	t	1	14	2022-08-21 23:08:40.077673+09	14	2022-08-22 00:50:06.032107+09	\N	\N
28	14	24	t	1	14	2022-08-22 00:21:25.906269+09	14	2022-08-22 00:57:46.705403+09	\N	\N
21	13	20	t	1	13	2022-08-21 18:48:47.614194+09	13	2022-08-22 01:09:13.555633+09	\N	\N
22	13	21	t	-1	13	2022-08-21 18:49:28.665685+09	13	2022-08-22 01:09:15.261522+09	\N	\N
29	12	22	t	0	12	2022-08-22 01:28:10.382037+09	\N	\N	\N	\N
17	12	18	t	1	12	2022-08-21 18:46:13.480753+09	12	2022-08-22 01:28:21.216325+09	\N	\N
19	12	19	t	-1	12	2022-08-21 18:48:09.421099+09	12	2022-08-22 01:28:22.77773+09	\N	\N
\.


--
-- Name: knex_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.knex_migrations_id_seq', 3, true);


--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.knex_migrations_lock_index_seq', 1, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 15, true);


--
-- Name: user_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_log_id_seq', 1, false);


--
-- Name: video_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.video_id_seq', 24, true);


--
-- Name: video_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.video_user_id_seq', 29, true);


--
-- Name: knex_migrations_lock knex_migrations_lock_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.knex_migrations_lock
    ADD CONSTRAINT knex_migrations_lock_pkey PRIMARY KEY (index);


--
-- Name: knex_migrations knex_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.knex_migrations
    ADD CONSTRAINT knex_migrations_pkey PRIMARY KEY (id);


--
-- Name: user user_email_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_email_unique UNIQUE (user_name);


--
-- Name: user_log user_log_last_token_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_log
    ADD CONSTRAINT user_log_last_token_unique UNIQUE (last_token);


--
-- Name: user_log user_log_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_log
    ADD CONSTRAINT user_log_pkey PRIMARY KEY (id);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: video video_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.video
    ADD CONSTRAINT video_pkey PRIMARY KEY (id);


--
-- Name: video video_url_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.video
    ADD CONSTRAINT video_url_unique UNIQUE (url);


--
-- Name: video_user video_user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.video_user
    ADD CONSTRAINT video_user_pkey PRIMARY KEY (id);


--
-- Name: video_user video_user_user_id_video_id_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.video_user
    ADD CONSTRAINT video_user_user_id_video_id_unique UNIQUE (user_id, video_id);


--
-- Name: user user_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER user_updated_at BEFORE UPDATE ON public."user" FOR EACH ROW EXECUTE FUNCTION public.on_update_timestamp();


--
-- Name: video video_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER video_updated_at BEFORE UPDATE ON public.video FOR EACH ROW EXECUTE FUNCTION public.on_update_timestamp();


--
-- Name: video_user video_user_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER video_user_updated_at BEFORE UPDATE ON public.video_user FOR EACH ROW EXECUTE FUNCTION public.on_update_timestamp();


--
-- Name: user_log user_log_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_log
    ADD CONSTRAINT user_log_user_id_foreign FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- Name: video_user video_user_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.video_user
    ADD CONSTRAINT video_user_user_id_foreign FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- Name: video_user video_user_video_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.video_user
    ADD CONSTRAINT video_user_video_id_foreign FOREIGN KEY (video_id) REFERENCES public.video(id);


--
-- PostgreSQL database dump complete
--

