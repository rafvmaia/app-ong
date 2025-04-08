--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

-- Started on 2025-04-07 19:51:44

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 16464)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    birthdate date NOT NULL,
    address character varying(255) NOT NULL,
    phone character varying(20) NOT NULL,
    active boolean DEFAULT true,
    bolsa_familia boolean DEFAULT false,
    attends_church boolean DEFAULT false,
    church_name character varying(255)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16463)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 4853 (class 0 OID 0)
-- Dependencies: 217
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4695 (class 2604 OID 16467)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 4847 (class 0 OID 16464)
-- Dependencies: 218
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, birthdate, address, phone, active, bolsa_familia, attends_church, church_name) FROM stdin;
8	pedro	1988-11-28	teste	123456	t	t	t	sp
2	teste 2	1989-11-28	cafezopolis	81995144321	t	t	t	IOC
3	teste 4	1989-11-28	cafezopolis	81995144321	t	t	t	IOC
4	Rafael Maia	1989-11-28	Itália	1234	t	t	t	Rio
5	leda valenca	1971-11-16	rua italia 111 imbiribeira, recife	81 998411990	t	t	t	IOC
9	Alessandra	1995-01-31	SC	12345	t	t	t	pm
12	testesssss	1989-11-28	sdsdsd1	213313	t	t	t	sdsds
13	fabio	1999-11-11	sdsd	121334	t	t	f	\N
14	Jose	1999-12-12	sdsd	12131	t	t	f	\N
6	caio ievc	1943-08-25	espanha	12345	t	t	t	ievc
15	tiago	1999-11-11	fdrdrdrd	999999999	t	t	t	uhuhu
1	teste 2	1989-11-28	cafezopolis	81995144321	f	t	t	IOC
7	Rafael	1989-11-28	Itália	1234	t	t	t	Rio
\.


--
-- TOC entry 4854 (class 0 OID 0)
-- Dependencies: 217
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 15, true);


--
-- TOC entry 4700 (class 2606 OID 16474)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


-- Completed on 2025-04-07 19:51:45

--
-- PostgreSQL database dump complete
--

