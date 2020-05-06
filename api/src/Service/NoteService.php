<?php

namespace App\Service;

use App\Entity\Note;
use Symfony\Component\DependencyInjection\ContainerInterface;

class NoteService
{

    /** @var ContainerInterface */
    private $container;

    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
    }

    public function create(array $content): Note
    {
        $entity = new Note();

        return $this->update($entity, $content);
    }

    public function update(Note $entity, $content): Note
    {

        $em = $this->container->get('doctrine')->getManager();

        $entity->setUpdatedAt(new \DateTime());
        $entity->setText($content['text'] ?? '');
        $entity->setTitle($content['title'] ?? '');

        $em->persist($entity);
        $em->flush();

        return $entity;
    }

    public function remove(Note $entity): void
    {
        $em = $this->container->get('doctrine')->getManager();

        $em->remove($entity);
        $em->flush();

    }

    public function serialize($entities): array
    {
        return json_decode($this->container->get('serializer')
            ->serialize($entities, 'json', ['api_v1']), true);
    }

}