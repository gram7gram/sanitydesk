<?php

namespace Test\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class NoteControllerTest extends WebTestCase
{

    public function testGetAll()
    {
        $client = static::createClient();

        $client->request('GET', '/v1/notes');

        $response = $client->getResponse();

        $this->assertEquals(200, $response->getStatusCode());

        $content = json_decode($response->getContent(), true);

        $this->assertTrue(isset($content['total']), 'Missing total');
        $this->assertTrue(isset($content['items']), 'Missing items');
    }

    public function testPost()
    {
        $client = static::createClient();

        $client->request('POST', '/v1/notes', [], [], [
            'CONTENT_TYPE' => 'application/json',
        ], json_encode([
            'title' => md5(uniqid()),
            'text' => md5(uniqid()),
        ]));

        $response = $client->getResponse();

        $this->assertEquals(201, $response->getStatusCode());

        $content = json_decode($response->getContent(), true);

        $this->assertTrue(isset($content['id']), 'Missing id');
        $this->assertTrue(isset($content['createdAt']), 'Missing createdAt');
        $this->assertTrue(isset($content['title']), 'Missing title');
        $this->assertTrue(isset($content['text']), 'Missing text');
    }

    public function testGetOne()
    {
        $client = static::createClient();

        $client->request('POST', '/v1/notes', [], [], [
            'CONTENT_TYPE' => 'application/json',
        ], json_encode([
            'title' => md5(uniqid()),
            'text' => md5(uniqid()),
        ]));

        $response = $client->getResponse();

        $this->assertEquals(201, $response->getStatusCode());

        $content = json_decode($response->getContent(), true);

        $client->request('GET', '/v1/notes/' . $content['id']);

        $response = $client->getResponse();

        $this->assertEquals(200, $response->getStatusCode());
    }

    public function testUpdateOne()
    {
        $client = static::createClient();

        $client->request('POST', '/v1/notes', [], [], [
            'CONTENT_TYPE' => 'application/json',
        ], json_encode([
            'title' => md5(uniqid()),
            'text' => md5(uniqid()),
        ]));

        $response = $client->getResponse();

        $this->assertEquals(201, $response->getStatusCode());

        $content = json_decode($response->getContent(), true);

        $client->request('PUT', '/v1/notes/' . $content['id'], [], [], [
            'CONTENT_TYPE' => 'application/json',
        ], json_encode([
            'title' => md5(uniqid()),
        ]));

        $response = $client->getResponse();

        $this->assertEquals(200, $response->getStatusCode());
    }

    public function testRemoveOne()
    {
        $client = static::createClient();

        $client->request('POST', '/v1/notes', [], [], [
            'CONTENT_TYPE' => 'application/json',
        ], json_encode([
            'title' => md5(uniqid()),
            'text' => md5(uniqid()),
        ]));

        $response = $client->getResponse();

        $this->assertEquals(201, $response->getStatusCode());

        $content = json_decode($response->getContent(), true);

        $client->request('DELETE', '/v1/notes/' . $content['id']);

        $response = $client->getResponse();

        $this->assertEquals(204, $response->getStatusCode());
    }
}