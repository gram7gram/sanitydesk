<?php

namespace App\Service;

use App\Entity\Note;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Serializer\SerializerInterface;

class NoteService
{

    /** @var EntityManagerInterface */
    private $em;
    /** @var Security */
    private $security;
    /** @var SerializerInterface */
    private $serializer;

    public function __construct(EntityManagerInterface $em, Security $security, SerializerInterface $serializer)
    {
        $this->em = $em;
        $this->security = $security;
        $this->serializer = $serializer;
    }

    public function create(array $content): Note
    {
        $user = $this->security->getUser();

        $entity = new Note();
        $entity->setCreatedBy($user);

        return $this->update($entity, $content);
    }

    public function update(Note $entity, $content): Note
    {
        $entity->setUpdatedAt(new \DateTime());
        $entity->setText($content['text'] ?? '');
        $entity->setTitle($content['title'] ?? '');

        $this->em->persist($entity);
        $this->em->flush();

        return $entity;
    }

    public function remove(Note $entity): void
    {
        $this->em->remove($entity);
        $this->em->flush();
    }

    public function serialize($entities): array
    {
        return json_decode($this->serializer
            ->serialize($entities, 'json', ['api_v1']), true);
    }

}